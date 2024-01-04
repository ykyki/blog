<script lang="ts">
    import Article from '$lib/component/Article.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { slug, article } = data;
    const titleLink = `/article/${slug}`;
</script>

<svelte:head>
    <title>{article.title}</title>
    <meta name="description" content={article.title} />
</svelte:head>

<Article {titleLink} {article} />
