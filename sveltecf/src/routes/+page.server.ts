import { fetchAllArticles } from '$lib/content/article';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
    const articles = await fetchAllArticles();

    return {
        date: new Date().toISOString(),
        articles,
    };
}) satisfies PageServerLoad;
