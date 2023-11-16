import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';
import yaml from 'js-yaml';
import { z } from 'zod';
import { Root } from 'remark-parse/lib';
import * as MdAST from 'mdast';

export default class Article {
    readonly source: string;

    constructor(source: string) {
        this.source = source;
    }

    get title(): string {
        return this.frontmatter?.title ?? '<No title>';
    }

    private get remarkTree(): Root {
        return remarkProcessor().parse(this.source);
    }

    get frontmatter(): Frontmatter | undefined {
        return extractFrontmatter(this.remarkTree);
    }

    get body(): ArticleBody {
        return extractArticleBody(this.remarkTree);
    }
}

type ArticleBody = {
    headings: Heading[];
    components: ArticleComponent[];
};

type ArticleComponent = Heading | DisplayComponent;
type DisplayComponent = Paragraph | List | Code | Unclassified;
type InlineComponent =
    | Text
    | Link
    | InlineCode
    | Emphasis
    | Strong
    | Unclassified;

interface Heading extends IsParent {
    type: 'heading';
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    // TODO children: (Text | Link)[];
    children: (Text | Unclassified)[];
}

interface Paragraph extends IsParent {
    type: 'paragraph';
    children: InlineComponent[];
}

interface List extends IsParent {
    type: 'list';
    ordered: boolean;
    children: ListItem[];
}

interface ListItem extends IsParent {
    type: 'listItem';
    // TODO children: (Paragraph | List)[];
    children: (ListItemPhrasing | List | Unclassified)[];
}

interface ListItemPhrasing extends IsParent {
    type: 'listItemPhrasing';
    children: InlineComponent[];
}

interface Code extends IsLeaf {
    type: 'code';
    lang?: string;
    value: string;
}

interface Text extends IsLeaf, IsLiteral {
    type: 'text';
    value: string;
}

interface Link extends IsLeaf {
    type: 'link';
    url: string;
    text?: string;
}

interface InlineCode extends IsLeaf, IsLiteral {
    type: 'inlineCode';
    value: string;
}

interface Emphasis extends IsLeaf, IsLiteral {
    type: 'emphasis';
    value: string;
}

interface Strong extends IsLeaf, IsLiteral {
    type: 'strong';
    value: string;
}

interface Unclassified extends IsNode {
    type: 'unclassified';
    typeValue: string;
    value: string;
}

interface IsLiteral extends IsLeaf {
    value: string;
}

interface IsNode {
    type: string;
}
interface IsParent extends IsNode {
    children: IsNode[];
}

interface IsLeaf extends IsNode {
    // children: never | undefined;
}

const frontmatterSchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
});
type Frontmatter = z.infer<typeof frontmatterSchema>;

const remarkProcessor = () =>
    unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(remarkGfm, { singleTilde: false })
        .use(remarkMath, { singleDollarTextMath: true });

const extractFrontmatter = (tree: Root): Frontmatter | undefined => {
    const node = tree.children[0];
    if (is(node, 'yaml')) {
        const meta = frontmatterSchema.safeParse(yaml.load(node.value));

        if (meta.success) {
            return meta.data;
        }
    }
    return undefined;
};

const extractArticleBody = (tree: Root): ArticleBody => {
    const components = convertMdASTRoot(tree);

    const headings = components.filter(
        (c): c is Heading => c.type === 'heading',
    ) satisfies Heading[];

    return {
        headings,
        components,
    };
};

type Maybe<T extends IsNode> = T | Unclassified;

const convertMdASTRoot = (node: MdAST.Root): ArticleComponent[] => {
    const children = node.children
        .filter((n) => !is(n, ['yaml']))
        .map((n) => {
            switch (n.type) {
                case 'code':
                    return convertMdASTCode(n);
                case 'heading':
                    return convertMdASTHeading(n);
                case 'paragraph':
                    return convertMdASTParagraph(n);
                case 'list':
                    return convertMdASTList(n);
                case 'definition':
                case 'footnoteDefinition':
                default:
                    return convertNodeToUnclassified(n);
            }
        });

    return children;
};

const convertMdASTHeading = (node: MdAST.Heading): Heading => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'text':
                return convertMdASTText(n);
            case 'link':
            case 'inlineCode':
            case 'emphasis':
            case 'strong':
            default:
                return convertNodeToUnclassified(n);
        }
    });

    return {
        type: 'heading',
        depth: node.depth,
        children,
    } satisfies Heading;
};

const convertMdASTParagraph = (node: MdAST.Paragraph): Paragraph => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'text':
                return convertMdASTText(n);
            case 'link':
                return convertMdASTLink(n);
            case 'inlineCode':
                return convertMdASTInlineCode(n);
            case 'emphasis':
                return convertMdASTEmphasis(n);
            case 'strong':
                return convertMdASTStrong(n);
            case 'inlineMath': // TODO
            default:
                return convertNodeToUnclassified(n);
        }
    });

    return {
        type: 'paragraph',
        children,
    } satisfies Paragraph;
};

const convertMdASTList = (node: MdAST.List): List => {
    const ordered = node?.ordered ?? false;

    const children = [] as ListItem[];
    visit(node, 'listItem', (n) => {
        children.push(covertMdASTListItem(n));
    });

    return {
        type: 'list',
        ordered,
        children,
    } satisfies List;
};

const covertMdASTListItem = (node: MdAST.ListItem): ListItem => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'list':
                return convertMdASTList(n);
            case 'paragraph':
                return convertMdASTParagraphToListItemPhrasing(n);
            case 'definition':
            case 'footnoteDefinition':
            default:
                return convertNodeToUnclassified(n);
        }
    });

    return {
        type: 'listItem',
        children,
    } satisfies ListItem;
};

const convertMdASTParagraphToListItemPhrasing = (
    node: MdAST.Paragraph,
): ListItemPhrasing => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'text':
                return convertMdASTText(n);
            case 'link':
                return convertMdASTLink(n);
            case 'inlineCode':
                return convertMdASTInlineCode(n);
            case 'emphasis':
                return convertMdASTEmphasis(n);
            case 'strong':
                return convertMdASTStrong(n);
            case 'inlineMath': // TODO
            default:
                return convertNodeToUnclassified(n);
        }
    });

    return {
        type: 'listItemPhrasing',
        children,
    } satisfies ListItemPhrasing;
};

const convertMdASTCode = (node: MdAST.Code): Code => {
    return {
        type: 'code',
        lang: node.lang ?? undefined,
        value: node.value,
    } satisfies Code;
};

const convertMdASTText = (node: MdAST.Text): Text => {
    return {
        type: 'text',
        value: node.value,
    } satisfies Text;
};

const convertMdASTLink = (node: MdAST.Link): Link => {
    let text: string | undefined;
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        text = node.children[0].value;
    }

    return {
        type: 'link',
        url: node.url,
        text,
    } satisfies Link;
};

const convertMdASTInlineCode = (node: MdAST.InlineCode): InlineCode => {
    return {
        type: 'inlineCode',
        value: node.value,
    } satisfies InlineCode;
};

const convertMdASTEmphasis = (node: MdAST.Emphasis): Maybe<Emphasis> => {
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        return {
            type: 'emphasis',
            value: node.children[0].value,
        } satisfies Emphasis;
    } else {
        return convertNodeToUnclassified(node);
    }
};

const convertMdASTStrong = (node: MdAST.Strong): Maybe<Strong> => {
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        return {
            type: 'strong',
            value: node.children[0].value,
        } satisfies Strong;
    } else {
        return convertNodeToUnclassified(node);
    }
};

const convertNodeToUnclassified = (node: MdAST.Node): Unclassified => {
    let value = '';
    if ('value' in node && typeof node.value === 'string') {
        value = node.value;
    }

    return {
        type: 'unclassified',
        typeValue: node.type,
        value,
    };
};
