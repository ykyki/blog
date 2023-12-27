<script lang="ts">
    import Article from '$lib/component/Article.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, articles } = data;
</script>

<h1>blog.ykyki.net</h1>
<p><b>🚧under construction🚧</b></p>
<p>rendered at {date}</p>

<hr />

<h2>Articles</h2>
<div>
    {#each articles as article, index}
        {@const titleLink = `/article/${index}`}
        <Article {titleLink} {article} />
        <hr />
    {/each}
</div>
