import { fetchAllArticles } from '$lib/content/article';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async ({ params }) => {
    const id = parseInt(params.id);
    const articles = await fetchAllArticles();

    const article = articles.find((_, index) => index === id);

    if (article === undefined) {
        throw error(404, 'Not found');
    }

    return {
        id,
        article,
    };
}) satisfies PageServerLoad;
