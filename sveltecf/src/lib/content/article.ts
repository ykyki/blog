import path from 'node:path';
import {  loadAllArticles, type Article } from 'uniproc';

const cache = {
    articles: undefined,
} as {
    articles: Article[] | undefined;
};

const contentPath = path.join(process.cwd(), '..', 'content');

export const fetchAllArticles = async (): Promise<Article[]> => {
    if (cache.articles !== undefined) {
        return cache.articles;
    }

    const articles = await loadAllArticles(contentPath);

    cache.articles = articles;
    return cache.articles;
};
