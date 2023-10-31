import fs from 'node:fs/promises';
import path from 'node:path';

export class Article {
    private title: string;
    private source: string;

    constructor(title: string, source: string) {
        this.title = title;
        this.source = source;
    }

    getTitle(): string {
        return this.title;
    }

    getSource(): string {
        return this.source;
    }
}

const contentPath = path.join(process.cwd(), '..', 'content');
const articlePath = path.join(contentPath, '2021');

const cache = {
    articles: undefined,
} as {
    articles: Article[] | undefined;
};

export const fetchAllArticles = async (): Promise<Article[]> => {
    if (cache.articles !== undefined) {
        return cache.articles;
    }

    const files = await fs.readdir(articlePath);
    // TODO ひとつでも失敗が発生したときにエラーになってしまう。失敗が発生したとしても継続できるようにする
    const articles = await Promise.all(
        files
            .map((filename) => path.join(articlePath, filename))
            .map(
                async (filepath) =>
                    new Article(
                        filepath.split('/').pop() as string,
                        await fs.readFile(filepath, 'utf-8'),
                    ),
            ),
    );

    cache.articles = articles;
    return cache.articles;
};
