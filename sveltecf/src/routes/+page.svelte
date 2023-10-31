<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, articles } = data;
</script>

<h1>blog.ykyki.net</h1>
<p>rendered at {date}</p>
<div>
    fcontent:
    <ol>
        {#each articles as article}
            <li>
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.source}</p>
                </div>
            </li>
        {/each}
    </ol>
</div>
