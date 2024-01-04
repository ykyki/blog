<script lang="ts">
    import Article from '$lib/component/Article.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { articles } = data;
</script>

{#each articles as article}
    {@const titleLink = `/article/${article.frontmatter.slug}`}
    <Article {titleLink} {article} />
    <hr />
{/each}
