import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import yaml from 'js-yaml';
import { z } from 'zod';
import { Root } from 'remark-parse/lib';
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
type Frontmatter = z.infer<typeof frontmatterSchema>;

const extractFrontmatter = (tree: Root): Frontmatter | undefined => {
    const node = tree.children[0];
    if (node.type === 'yaml') {
        const meta = frontmatterSchema.safeParse(yaml.load(node.value));

        if (meta.success) {
            return meta.data;
        }
    }

    return undefined;
};
