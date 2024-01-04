import path from 'node:path';
import { type Schema, loadAllArticles } from 'uniproc';

const cache = {
    articles: undefined,
} as {
    articles: Schema.Article[] | undefined;
};

const contentPath = path.join(process.cwd(), '..', 'content');

export const fetchAllArticles = async (): Promise<Schema.Article[]> => {
    if (cache.articles !== undefined) {
        return cache.articles;
    }

    const articles = await loadAllArticles(contentPath);

    cache.articles = articles;
    return cache.articles;
};
