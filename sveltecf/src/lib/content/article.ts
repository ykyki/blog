import { Article, readAllArticles } from 'uniproc';

const cache = {
    articles: undefined,
} as {
    articles: Article[] | undefined;
};

export const fetchAllArticles = async (): Promise<Article[]> => {
    if (cache.articles !== undefined) {
        return cache.articles;
    }

    const articles = await readAllArticles();

    cache.articles = articles;
    return cache.articles;
};
