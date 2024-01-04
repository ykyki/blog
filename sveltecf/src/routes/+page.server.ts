import { fetchAllArticles } from '$lib/content/article';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
    const articles = (await fetchAllArticles())
        // .filter((a) => a.frontmatter.draft === false)
        .sort((a, b) =>
            a.frontmatter.createdAt > b.frontmatter.createdAt ? 1 : -1,
        );

    return {
        date: new Date().toISOString(),
        articles,
    };
}) satisfies PageServerLoad;
