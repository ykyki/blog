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

    <h3>All Articles</h3>
    <section>
        <p><a href={articleAllPath}>all articles</a></p>
    </section>
</BlogBase>
