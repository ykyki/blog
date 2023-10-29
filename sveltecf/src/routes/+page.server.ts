import type { PageServerLoad } from './$types';
import { promises as fs } from 'fs';

export const prerender = true;

export const load = (async () => {
    const fcont1 = await fs.readFile(
        '../content/2021/0004-texdoc-default-viewer.md',
        'utf-8',
    );
    const fcont2 = await fs.readFile(
        '../content/2021/0001-brouwer-fixed-point-theorem-print.md',
        'utf-8',
    );

    return {
        date: new Date().toISOString(),
        fcont: [fcont1, fcont2],
    };
}) satisfies PageServerLoad;
