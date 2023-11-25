import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';
import * as MdAST from 'mdast';
import { z } from 'zod';
import yaml from 'js-yaml';
import * as Schema from '@src/schema/Schema';

export class ArticleParser {
    readonly source: string;

    constructor(source: string) {
        this.source = source;
    }

    private get remarkTree(): MdAST.Root {
        return remarkProcessor().parse(this.source);
    }

    get frontmatter(): Schema.Frontmatter {
        return extractFrontmatter(this.remarkTree);
    }

    get headings(): Schema.Heading[] {
        const headings = this.root.children.filter(
            (c): c is Schema.Heading => c.type === 'heading',
        ) satisfies Schema.Heading[];

        return headings;
    }

    get root(): Schema.Root {
        return convertMdASTRoot(this.remarkTree);
    }
}

const remarkProcessor = () =>
    unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(remarkGfm, { singleTilde: false })
        .use(remarkMath, { singleDollarTextMath: true });

const frontmatterSchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
});

const extractFrontmatter = (tree: MdAST.Root): Schema.Frontmatter => {
    const node = tree.children[0];
    if (!is(node, 'yaml')) {
        throw new Error('Head node must be yaml');
    }

    const meta = frontmatterSchema.safeParse(yaml.load(node.value));
    if (!meta.success) {
        throw new Error('Ill-formed frontmatter');
    }

    return meta.data;
};

type Maybe<T extends Schema.IsNode> = T | Schema.Unclassified;

const convertMdASTRoot = (node: MdAST.Root): Schema.Root => {
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

    return {
        type: 'root',
        children,
    } satisfies Schema.Root;
};

const convertMdASTHeading = (node: MdAST.Heading): Schema.Heading => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'text':
                return convertMdASTText(n);
            case 'link':
            case 'inlineCode':
            case 'emphasis':
            case 'strong':
            default:
                throw new Error(`Unsupported heading children: ${n.type}`);
        }
    });

    return {
        type: 'heading',
        depth: node.depth,
        children,
    } satisfies Schema.Heading;
};

const convertMdASTParagraph = (node: MdAST.Paragraph): Schema.Paragraph => {
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
    } satisfies Schema.Paragraph;
};

const convertMdASTList = (node: MdAST.List): Schema.List => {
    const ordered = node?.ordered ?? false;

    const children = [] as Schema.ListItem[];
    visit(node, 'listItem', (n) => {
        children.push(covertMdASTListItem(n));
    });

    return {
        type: 'list',
        ordered,
        children,
    } satisfies Schema.List;
};

const covertMdASTListItem = (node: MdAST.ListItem): Schema.ListItem => {
    const children = node.children.flatMap((n): Schema.ListItem['children'] => {
        switch (n.type) {
            case 'list':
                return [convertMdASTList(n)];
            case 'paragraph':
                return convertMdASTParagraph(n).children;
            case 'code':
                return [convertMdASTCode(n)];
            case 'definition':
            case 'footnoteDefinition':
            default:
                throw new Error(`Unsupported list item children: ${n.type}`);
        }
    });

    return {
        type: 'listItem',
        children,
    } satisfies Schema.ListItem;
};

const convertMdASTCode = (node: MdAST.Code): Schema.Code => {
    return {
        type: 'code',
        lang: node.lang ?? undefined,
        value: node.value,
    } satisfies Schema.Code;
};

const convertMdASTText = (node: MdAST.Text): Schema.Text => {
    return {
        type: 'text',
        value: node.value,
    } satisfies Schema.Text;
};

const convertMdASTLink = (node: MdAST.Link): Schema.Link => {
    let text: string | undefined;
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        text = node.children[0].value;
    }

    return {
        type: 'link',
        url: node.url,
        text,
    } satisfies Schema.Link;
};

const convertMdASTInlineCode = (node: MdAST.InlineCode): Schema.InlineCode => {
    return {
        type: 'inlineCode',
        value: node.value,
    } satisfies Schema.InlineCode;
};

const convertMdASTEmphasis = (node: MdAST.Emphasis): Maybe<Schema.Emphasis> => {
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        return {
            type: 'emphasis',
            value: node.children[0].value,
        } satisfies Schema.Emphasis;
    } else {
        return convertNodeToUnclassified(node);
    }
};

const convertMdASTStrong = (node: MdAST.Strong): Maybe<Schema.Strong> => {
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        return {
            type: 'strong',
            value: node.children[0].value,
        } satisfies Schema.Strong;
    } else {
        return convertNodeToUnclassified(node);
    }
};

const convertNodeToUnclassified = (node: MdAST.Node): Schema.Unclassified => {
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
