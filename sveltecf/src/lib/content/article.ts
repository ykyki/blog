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

    const articles = (await loadAllArticles(contentPath))
        // .filter((a) => a.frontmatter.draft === false)
        .sort((a, b) =>
            a.frontmatter.createdAt > b.frontmatter.createdAt ? 1 : -1,
        );

    cache.articles = articles;
    return cache.articles;
};
