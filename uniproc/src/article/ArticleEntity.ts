import * as Schema from '@src/schema/Schema';
import { ArticleParser } from '@src/article/parseWithMdAST';

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

    get body(): Schema.ArticleBody {
        return this.parser.body;
    }

    toArticle = (): Schema.Article => {
        return {
            title: this.title,
            frontmatter: this.frontmatter,
            body: this.body,
        };
    };
}
