<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import Article from '$lib/component/Article.svelte';
    import { resolveRoute } from '$app/paths';
    import type { PageData } from './$types';

    export let data: PageData;

    const { articles } = data;
</script>

<BlogBase>
    {#each articles as article}
        {@const articlePath = resolveRoute(`/article/[slug]`, {
            slug: article.frontmatter.slug,
        })}
        <Article {articlePath} {article} />
        <hr />
    {/each}
</BlogBase>

<style>
    hr {
        background-color: var(--surface-4);
        height: var(--size-1);
        margin: var(--size-4) 0;
    }
</style>
