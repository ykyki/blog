<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, articles } = data;
</script>

<BlogBase>
    <p><b>🚧under construction🚧</b></p>

    <h2>Articles</h2>
    {#each articles as article}
        {@const titleLink = `/article/${article.frontmatter.slug}`}
        <section>
            <h3><a href={titleLink}>{article.title}</a></h3>
            <p>created: {article.frontmatter.createdAt.toString()}</p>
            <p>updated: {article.frontmatter.updatedAt.toString()}</p>
            <p>tags: {article.frontmatter.tags.join(', ')}</p>
        </section>
    {/each}
    <section>
        <h3><a href="/article/all">all</a></h3>
        <p>all articles</p>
    </section>
</BlogBase>
