<script lang="ts">
    import { format } from 'date-fns';
    import type { Schema } from 'uniproc';
    import DisplayComponent from '$lib/component/DisplayComponent.svelte';
    import InlineComponent from '$lib/component/InlineComponent.svelte';
    import MetadataList from '$lib/component/MetadataList.svelte';

    export let article: Schema.Article;
    export let articlePath: string | undefined = undefined;
    const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss';
</script>

<div class="base">
    <h1>
        {#if articlePath}<a href={articlePath}>{article.title}</a
            >{:else}{article.title}{/if}
    </h1>

    <MetadataList
        items={{
            createdAt: format(article.frontmatter.createdAt, dateTimeFormat),
            updatedAt: format(article.frontmatter.updatedAt, dateTimeFormat),
            tags: article.frontmatter.tags,
        }} />

    <dt>Table of Contents</dt>
    <dd>
        <ul>
            {#each article.headings as heading}
                <li>
                    {'#'.repeat(heading.depth)}{' '}
                    <InlineComponent component={heading} />
                </li>
            {/each}
        </ul>
    </dd>

    <article>
        {#each article.root.children as component}
            <DisplayComponent {component} />
        {/each}
    </article>
</div>

<style>
    .base {
        display: flex;
        flex-direction: column;
        gap: var(--size-2);

        & article {
            padding-top: var(--size-5);
        }
    }

    article {
        display: flex;
        flex-direction: column;
        gap: var(--size-4);
    }

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
