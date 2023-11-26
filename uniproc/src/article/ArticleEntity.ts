import { ArticleParser } from '@src/article/parseWithMdAST';
import * as Schema from '@src/schema/Schema';

export default class ArticleEntity {
    private readonly parser: ArticleParser;
    readonly path: string;

    constructor(source: string, path: string) {
        this.parser = new ArticleParser(source);
        this.path = path;
    }

    get title(): string {
        return this.frontmatter.title;
    }

    get frontmatter(): Schema.Frontmatter {
        return this.parser.frontmatter;
    }

    get headings(): Schema.Heading[] {
        return this.parser.headings;
    }

    get root(): Schema.Root {
        return this.parser.root;
    }

    toArticle = (): Schema.Article => {
        return {
            title: this.title,
            frontmatter: this.frontmatter,
            headings: this.headings,
            root: this.root,
        };
    };
}
