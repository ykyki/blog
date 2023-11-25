<script lang="ts">
    import { text } from '@sveltejs/kit';
    import type {
        Heading,
        InlineComponent,
    } from 'uniproc/dist/schema/ArticleComponent';

    export let component: InlineComponent | Heading;
</script>

{#if component.type === 'text'}
    <span>{component.value}</span>
{:else if component.type === 'heading'}
    {#each component.children as child}<svelte:self component={child} />{/each}
{:else if component.type === 'link'}
    {#if component.text === undefined}<a href={component.url}
            >{component.url}</a>
    {:else}<a href={component.url}>{component.text}</a>{/if}
{:else if component.type === 'inlineCode'}<code>{component.value}</code>
{:else if component.type === 'emphasis'}<b>{component.value}</b>
{:else if component.type === 'strong'}<strong>{component.value}</strong>
{:else}
    <span>Unknown Component Type: {component.type}</span>
{/if}
