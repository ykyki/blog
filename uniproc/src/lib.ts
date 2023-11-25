import { loadAllArticleEntityList } from '@src/loader';
import * as Schema from '@src/schema/Schema';

export const loadAllArticles = async (
    contentPath: string,
): Promise<Schema.Article[]> => {
    return (await loadAllArticleEntityList(contentPath)).map((v) =>
        v.toArticle(),
    );
};

export type { Article } from '@src/schema/Schema';
