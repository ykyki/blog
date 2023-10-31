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

export const fetchAllArticles = async (): Promise<Article[]> => {
    const files = await fs.readdir(articlePath);

    // TODO ひとつでも失敗が発生したときにエラーになってしまう。失敗が発生したとしても継続できるようにする
    return Promise.all(
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
};
