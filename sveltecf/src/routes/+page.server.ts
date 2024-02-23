import { fetchAllArticles } from '$lib/content/article';
import type { PageServerLoad } from './$types';

import POSTS from '$lib/data/posts';

export const prerender = true;

export const load = (async () => {
    const articles = (await fetchAllArticles())
        .filter((a) => a.frontmatter.draft === false)
        .sort((a, b) =>
            a.frontmatter.createdAt < b.frontmatter.createdAt ? 1 : -1,
        );

    const posts = POSTS.sort((a, b) => (a.postDate < b.postDate ? 1 : -1));

    return {
        currentDate: new Date().toISOString(),
        posts,
        articles,
    };
}) satisfies PageServerLoad;
