import { fetchAllArticles } from '$lib/content/article';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
    const artilces = await fetchAllArticles();

    return {
        date: new Date().toISOString(),
        articles: artilces.map((article) => ({
            title: article.title,
            frontmatter: JSON.stringify(article.frontmatter), // TODO
            source: JSON.stringify(article.body), // TODO
        })),
    };
}) satisfies PageServerLoad;
