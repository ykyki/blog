<script lang="ts">
    import DisplayComponent from '$lib/component/DisplayComponent.svelte';
    import InlineComponent from '$lib/component/InlineComponent.svelte';
    import type { Article } from 'uniproc/dist/schema/Article';

    export let article: Article;
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
        {#each article.body.headings as heading}
            <li>
                <InlineComponent component={heading} />
            </li>
        {/each}
    </ul>
</div>

<div>
    {#each article.body.components as component}
        <DisplayComponent {component} />
    {/each}
</div>
