import { fetchAllArticles } from '$lib/content/article';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async ({ params }) => {
    const slug = params.slug as string;
    const articles = await fetchAllArticles();

    // const article = articles.find((_, index) => index === id);
    const article = articles.find(
        (article) => article.frontmatter.slug === slug,
    );

    if (article === undefined) {
        throw error(404, 'Not found');
    }

    return {
        slug,
        article,
    };
}) satisfies PageServerLoad;
