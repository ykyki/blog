<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import Article from '$lib/component/Article.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { article } = data;
</script>

<svelte:head>
    <title>{article.title}</title>
    <meta name="description" content={article.title} />
</svelte:head>

<BlogBase>
    <Article {article} />
</BlogBase>
