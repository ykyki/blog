<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import { resolveRoute } from '$app/paths';
    import type { PageData } from './$types';

    export let data: PageData;

    const { articles } = data;
    const articleAllPath = resolveRoute(`/article/all`, {});
</script>

<BlogBase>
    <p><b>🚧under construction🚧</b></p>

    <section>
        <h2>Articles</h2>
        {#each articles as article}
            {@const articlePath = resolveRoute(`/article/[slug]`, {
                slug: article.frontmatter.slug,
            })}
            <section>
                <h3><a href={articlePath}>{article.title}</a></h3>
                <p>created: {article.frontmatter.createdAt.toString()}</p>
                <p>updated: {article.frontmatter.updatedAt.toString()}</p>
                <p>tags: {article.frontmatter.tags.join(', ')}</p>
            </section>
        {/each}

        <section>
            <h3><a href={articleAllPath}>All articles</a></h3>
            <p>…</p>
        </section>
    </section>
</BlogBase>

<style>
    a {
        text-decoration: underline;
        &:hover {
            color: var(--text-2);
        }
    }
    a:visited {
        color: var(--link-visited);
    }
</style>
