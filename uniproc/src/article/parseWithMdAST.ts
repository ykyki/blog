import * as Schema from '@src/schema/Schema';
import yaml from 'js-yaml';
import * as mdAst from 'mdast';
import * as mdAstMath from 'mdast-util-math';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';
import { z } from 'zod';

export class ArticleParser {
    readonly source: string;

    constructor(source: string) {
        this.source = source;
    }

    private get remarkTree(): mdAst.Root {
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
        return convertMdAstRoot(this.remarkTree);
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

const extractFrontmatter = (tree: mdAst.Root): Schema.Frontmatter => {
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

const convertMdAstRoot = (node: mdAst.Root): Schema.Root => {
    const children = node.children
        .filter((n) => !is(n, ['yaml']))
        .map((n) => {
            switch (n.type) {
                case 'code':
                    return convertMdAstCode(n);
                case 'heading':
                    return convertMdAstHeading(n);
                case 'paragraph':
                    return convertMdAstParagraph(n);
                case 'list':
                    return convertMdAstList(n);
                case 'math':
                    return convertMdAstMath(n as mdAstMath.Math);
                // case "definition":
                // case "footnoteDefinition":
                default:
                    throw new Error(`Unsupported root children: ${n.type}`);
            }
        });

    return {
        type: 'root',
        children,
    } satisfies Schema.Root;
};

const convertMdAstHeading = (node: mdAst.Heading): Schema.Heading => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'text':
                return convertMdAstText(n);
            // case "link":
            // case "inlineCode":
            // case "emphasis":
            // case "strong":
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

const convertMdAstParagraph = (node: mdAst.Paragraph): Schema.Paragraph => {
    const children = node.children.map((n) => {
        switch (n.type) {
            case 'text':
                return convertMdAstText(n);
            case 'link':
                return convertMdAstLink(n);
            case 'inlineCode':
                return convertMdAstInlineCode(n);
            case 'emphasis':
                return convertMdAstEmphasis(n);
            case 'strong':
                return convertMdAstStrong(n);
            case 'inlineMath':
                return convertMdAstInlineMath(n);
            default:
                throw new Error(`Unsupported paragraph children: ${n.type}`);
        }
    });

    return {
        type: 'paragraph',
        children,
    } satisfies Schema.Paragraph;
};

const convertMdAstList = (node: mdAst.List): Schema.List => {
    const ordered = node?.ordered ?? false;

    const children = [] as Schema.ListItem[];
    visit(node, 'listItem', (n) => {
        children.push(covertMdAstListItem(n));
    });

    return {
        type: 'list',
        ordered,
        children,
    } satisfies Schema.List;
};

const covertMdAstListItem = (node: mdAst.ListItem): Schema.ListItem => {
    const children = node.children.flatMap((n): Schema.ListItem['children'] => {
        switch (n.type) {
            case 'list':
                return [convertMdAstList(n)];
            case 'paragraph':
                return convertMdAstParagraph(n).children;
            case 'code':
                return [convertMdAstCode(n)];
            // case "definition":
            // case "footnoteDefinition":
            default:
                throw new Error(`Unsupported list item children: ${n.type}`);
        }
    });

    return {
        type: 'listItem',
        children,
    } satisfies Schema.ListItem;
};

const convertMdAstCode = (node: mdAst.Code): Schema.Code => {
    return {
        type: 'code',
        lang: node.lang ?? undefined,
        value: node.value,
    } satisfies Schema.Code;
};

const convertMdAstText = (node: mdAst.Text): Schema.Text => {
    return {
        type: 'text',
        value: node.value,
    } satisfies Schema.Text;
};

const convertMdAstLink = (node: mdAst.Link): Schema.Link => {
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

const convertMdAstInlineCode = (node: mdAst.InlineCode): Schema.InlineCode => {
    return {
        type: 'inlineCode',
        value: node.value,
    } satisfies Schema.InlineCode;
};

const convertMdAstEmphasis = (node: mdAst.Emphasis): Schema.Emphasis => {
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        return {
            type: 'emphasis',
            value: node.children[0].value,
        } satisfies Schema.Emphasis;
    }
    throw new Error(`Ill-formed emphasis${JSON.stringify(node)}`);
};

const convertMdAstStrong = (node: mdAst.Strong): Schema.Strong => {
    if (node.children.length === 1 && is(node.children[0], 'text')) {
        return {
            type: 'strong',
            value: node.children[0].value,
        } satisfies Schema.Strong;
    }
    throw new Error(`Ill-formed strong${JSON.stringify(node)}`);
};

const convertMdAstMath = (node: mdAstMath.Math): Schema.DisplayMath => {
    return {
        type: 'displayMath',
        value: node.value,
    } satisfies Schema.DisplayMath;
};

const convertMdAstInlineMath = (
    node: mdAstMath.InlineMath,
): Schema.InlineMath => {
    return {
        type: 'inlineMath',
        value: node.value,
    } satisfies Schema.InlineMath;
};
