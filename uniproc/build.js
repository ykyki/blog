import * as Bun from 'bun';

const result = await Bun.build({
    entrypoints: ['./src/lib.ts'],
    outdir: './dist',
    naming: 'lib.js',
    format: 'esm',
    target: 'node',
    external: ['node:fs/promise', 'node:path'],
});
console.log(result);
