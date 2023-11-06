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
import { Node } from 'mdast';

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

type ArticleComponent = Heading | Paragraph | List | Unclassified;

type Heading = {
    type: 'heading';
    depth: number;
    value: string;
};

type Paragraph = {
    type: 'paragraph';
    value: string;
};

type List = {
    type: 'list';
    ordered: boolean;
    items: ListItem[];
};

type ListItem = string;

type Unclassified = {
    type: 'unclassified';
    typeValue: string;
    value: string;
};

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
    const components: ArticleComponent[] = [];

    visit(
        tree,
        (node) => !is(node, 'listItem'),
        (node) => {
            let c: ArticleComponent;
            switch (node.type) {
                case 'heading': {
                    if (is(node.children[0], 'text')) {
                        const value = node.children[0].value;

                        c = {
                            type: 'heading',
                            depth: node.depth,
                            value: value,
                        };
                    } else {
                        c = convertNodeToUnclassified(node);
                    }
                    break;
                }
                case 'list': {
                    const ordered = node?.ordered ?? false;

                    const items = [] as ListItem[];
                    visit(node, 'listItem', (n) => {
                        if (is(n.children[0], 'paragraph')) {
                            if (is(n.children[0].children[0], 'text')) {
                                items.push(n.children[0].children[0].value);
                            }
                        }
                    });

                    c = {
                        type: 'list',
                        ordered,
                        items,
                    };
                    break;
                }
                case 'paragraph':
                    if (is(node.children[0], 'text')) {
                        const value = node.children[0].value;

                        c = {
                            type: 'paragraph',
                            value: value,
                        };
                    } else {
                        c = convertNodeToUnclassified(node);
                    }
                    break;
                default:
                    c = convertNodeToUnclassified(node);
            }

            components.push(c);
        },
    );

    const headings = components.filter(
        (c) => c.type === 'heading',
    ) as Heading[];

    return {
        headings,
        components,
    };
};

const convertNodeToUnclassified = (node: Node): Unclassified => {
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
