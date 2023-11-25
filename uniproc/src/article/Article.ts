import { ArticleParser } from '@src/article/parseWithMdAST';
import { Frontmatter } from '@src/schema/Frontmatter';
import { ArticleBody } from '@src/schema/Article';

export default class Article {
    private readonly parser: ArticleParser;

    constructor(source: string) {
        this.parser = new ArticleParser(source);
    }

    get title(): string {
        return this.frontmatter?.title ?? '<No title>';
    }

    get frontmatter(): Frontmatter | undefined {
        return this.parser.frontmatter;
    }

    get body(): ArticleBody {
        return this.parser.body;
    }
}
