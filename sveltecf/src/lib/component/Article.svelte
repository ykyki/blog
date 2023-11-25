<script lang="ts">
    import DisplayComponent from '$lib/component/DisplayComponent.svelte';
    import InlineComponent from '$lib/component/InlineComponent.svelte';
    import type { Schema } from 'uniproc';

    export let article: Schema.Article;
</script>

<h1>{article.title}</h1>

<div>
    <dvi>date: {article.frontmatter.date.toString()}</dvi>
    <div>
        tags: <ul>
            {#each article.frontmatter.tags as tag}<li>{tag}</li>{/each}
        </ul>
    </div>
</div>

<div>
    Table of Contents:
    <ul>
        {#each article.headings as heading}
            <li>
                <InlineComponent component={heading} />
            </li>
        {/each}
    </ul>
</div>

<div>
    {#each article.root.children as component}
        <DisplayComponent {component} />
    {/each}
</div>
