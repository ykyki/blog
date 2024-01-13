<script lang="ts">
    import type { Schema } from 'uniproc';
    import InlineComponent from '$lib/component/InlineComponent.svelte';
    import MathExpr from '$lib/component/MathExpr.svelte';

    export let component: Schema.DisplayComponent | Schema.Heading;
</script>

{#if component.type === 'heading'}
    {@const depth = component.depth}
    {@const level = Math.min(depth, 6)}
    <svelte:element this={`h${level}`}>
        {'#'.repeat(depth)}
        {#each component.children as child}
            <InlineComponent component={child} />
        {/each}
    </svelte:element>
{:else if component.type === 'paragraph'}
    <p>
        {#each component.children as child}<InlineComponent
                component={child} />{/each}
    </p>
{:else if component.type === 'list'}
    <svelte:element this={component.ordered ? 'ol' : 'ul'}>
        {#each component.children as child}
            <li>
                {#each child.children as grandChild}
                    {#if grandChild.type === 'list' || grandChild.type === 'code'}
                        <svelte:self component={grandChild} />
                    {:else}
                        <InlineComponent component={grandChild} />
                    {/if}
                {/each}
            </li>
        {/each}
    </svelte:element>
{:else if component.type === 'code'}
    <pre><code>{component.value}</code></pre>
{:else if component.type === 'displayMath'}
    <MathExpr expr={component.value} mode={'display'} />
{/if}

<style>
    p {
        min-width: 100%;
    }
    pre {
        min-width: 100%;
        padding: var(--size-2);
        overflow: scroll;
        border: var(--border-size-1) solid var(--gray-1);
    }
    li {
        min-width: 100%;
        white-space: pre-wrap;
    }
    code {
        width: 100%;
        font-family: var(--font-mono);
        letter-spacing: var(--font-letterspacing-0);
    }
</style>
