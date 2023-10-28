import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        date: new Date().toISOString(),
    };
}) satisfies PageServerLoad;
