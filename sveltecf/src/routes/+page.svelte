<script lang="ts">
    import Article from '$lib/component/Article.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, articles } = data;
</script>

<h1><span>blog.ykyki.net</span></h1>
<p><b>🚧under construction🚧</b></p>
<p>rendered at {date}</p>

<hr />

<h2>Articles</h2>
<div>
    {#each articles as article}
        {@const titleLink = `/article/${article.frontmatter.slug}`}
        <Article {titleLink} {article} />
        <hr />
    {/each}
</div>

<style>
    h1 > span {
        background: linear-gradient(60deg, #f2a874, #cdaf92);
        /* background: linear-gradient(45deg, #e66465, #9198e5); */
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
</style>
