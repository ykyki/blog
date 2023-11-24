import { ArticleComponent, Frontmatter, Heading } from '@src/article/schema';
import { ArticleParser } from '@src/article/parseWithMdAST';

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

export type ArticleBody = {
    headings: Heading[];
    components: ArticleComponent[];
};
