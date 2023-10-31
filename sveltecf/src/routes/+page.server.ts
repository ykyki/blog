import type { PageServerLoad } from './$types';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = true;

export const load = (async () => {
    const contentPath = path.join(process.cwd(), '..', 'content');

    const fcont1 = await fs.readFile(
        path.join(contentPath, '2021', '0004-texdoc-default-viewer.md'),
        'utf-8',
    );
    const fcont2 = await fs.readFile(
        path.join(
            contentPath,
            '2021',
            '0001-brouwer-fixed-point-theorem-print.md',
        ),
        'utf-8',
    );

    return {
        date: new Date().toISOString(),
        fcont: [fcont1, fcont2],
    };
}) satisfies PageServerLoad;
