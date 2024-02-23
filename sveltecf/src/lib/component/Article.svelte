<script lang="ts">
    import DisplayComponent from '$lib/component/DisplayComponent.svelte';
    import InlineComponent from '$lib/component/InlineComponent.svelte';
    import type { Schema } from 'uniproc';

    export let article: Schema.Article;
    export let articlePath: string | undefined = undefined;
</script>

<h1>
    {#if articlePath}<a href={articlePath}>{article.title}</a
        >{:else}{article.title}{/if}
</h1>

<div>
    <ul>
        <li>created: {article.frontmatter.createdAt.toString()}</li>
        <li>updated: {article.frontmatter.updatedAt.toString()}</li>
    </ul>

    tags:
    <ul>
        {#each article.frontmatter.tags as tag}<li>{tag}</li>{/each}
    </ul>

    Table of Contents:
    <ul>
        {#each article.headings as heading}
            <li>
                {'#'.repeat(heading.depth)}{' '}
                <InlineComponent component={heading} />
            </li>
        {/each}
    </ul>
</div>

<article>
    {#each article.root.children as component}
        <DisplayComponent {component} />
    {/each}
</article>

<style>
    h1 {
        color: var(--yellow-4);
    }
    h1 > a {
        color: var(--yellow-4);
        text-decoration: underline;
    }

    article {
        font-family: var(--font-sans);
    }
    article > :global(*) {
        line-height: var(--font-lineheight-5);
    }
</style>
