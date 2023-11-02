import path from 'node:path';
import fs from 'node:fs/promises';
import Article from './Article';

export const loadAllArticles = async (
    contentPath: string,
): Promise<Article[]> => {
    const articlePath = path.join(contentPath, '2021');
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

    return articles;
};
