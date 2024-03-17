import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        sveltekit(),
        visualizer({
            filename: 'bundle-stats.html',
        }),
    ],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
    },
});
