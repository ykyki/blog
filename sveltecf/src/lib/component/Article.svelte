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

    <div class="toc">
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
    </div>

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

        & > h1 {
            padding-bottom: var(--size-3);
        }

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

    div.toc ul {
        padding: 0;
    }
    div.toc li {
        padding: 0;
        padding-left: 1rem;
        list-style: none;
        &:not(:last-child) {
            padding-bottom: 0.2rem;
        }
    }
    @media (width < 768px) {
        div.toc {
            display: none;
        }
    }

    article {
        font-family: var(--font-sans);
    }
    article > :global(*) {
        line-height: var(--font-lineheight-5);
    }
</style>
