<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, articles } = data;
</script>

<h1><span>blog.ykyki.net</span></h1>
<p><b>🚧under construction🚧</b></p>
<p>rendered at {date}</p>

<hr />

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

<style>
    h1 > span {
        background: linear-gradient(60deg, #f2a874, #cdaf92);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
</style>
