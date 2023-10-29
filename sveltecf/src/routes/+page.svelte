<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const { date, fcont } = data;
</script>

<h1>blog.ykyki.net</h1>
<p>rendered at {date}</p>
<div>
    fcontent:
    <ol>
        {#each fcont as item}
            <li>{item}</li>
        {/each}
    </ol>
</div>
