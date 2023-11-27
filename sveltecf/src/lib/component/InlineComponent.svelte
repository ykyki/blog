<script lang="ts">
    import type { Schema } from 'uniproc';
    import MathExpr from '$lib/component/MathExpr.svelte';
    export let component: Schema.InlineComponent | Schema.Heading;
</script>

{#if component.type === 'text'}
    <span>{component.value}</span>
{:else if component.type === 'heading'}
    {#each component.children as child}<svelte:self component={child} />{/each}
{:else if component.type === 'link'}
    <a href={component.url}>{component.text ?? component.url}</a>
{:else if component.type === 'inlineCode'}<code>{component.value}</code>
{:else if component.type === 'emphasis'}<b>{component.value}</b>
{:else if component.type === 'strong'}<strong>{component.value}</strong>
{:else if component.type === 'inlineMath'}<MathExpr
        expr={component.value}
        mode={'inline'} />
{/if}
