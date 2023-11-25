import * as Schema from '@src/schema/Schema';
import { ArticleParser } from '@src/article/parseWithMdAST';

export default class ArticleEntity implements Schema.Article {
    private readonly parser: ArticleParser;

    constructor(source: string) {
        this.parser = new ArticleParser(source);
    }

    get title(): string {
        return this.frontmatter?.title ?? '<No title>';
    }

    get frontmatter(): Schema.Frontmatter {
        return this.parser.frontmatter;
    }

    get body(): Schema.ArticleBody {
        return this.parser.body;
    }
}
