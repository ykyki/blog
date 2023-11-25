<script lang="ts">
    import Article from '$lib/component/Article.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, articles } = data;
</script>

<h1>blog.ykyki.net</h1>
<p>rendered at {date}</p>

<hr />

<h2>Articles</h2>
<div>
    <ol>
        {#each articles as article, index}
            <li>
                <a href="/article/{index}">{article.title}</a>
                <Article {article} />
                <hr />
            </li>
        {/each}
    </ol>
</div>
