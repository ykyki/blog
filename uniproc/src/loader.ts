import path from 'node:path';
import fs from 'node:fs/promises';
import ArticleEntity from '@src/article/ArticleEntity';

export const loadAllArticleEntityList = async (
    contentPath: string,
): Promise<ArticleEntity[]> => {
    const articlePath = path.join(contentPath, '2021');
    const files = await fs.readdir(articlePath);
    // TODO ひとつでも失敗が発生したときにエラーになってしまう。失敗が発生したとしても継続できるようにする
    const articles = await Promise.all(
        files
            .map((filename) => path.join(articlePath, filename))
            .map(
                async (filepath) =>
                    new ArticleEntity(await fs.readFile(filepath, 'utf-8')),
            ),
    );

    return articles;
};
