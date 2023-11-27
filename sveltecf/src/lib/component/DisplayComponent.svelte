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
    {#if component.ordered}
        <ol>
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
        </ol>
    {:else}
        <ul>
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
        </ul>
    {/if}
{:else if component.type === 'code'}
    <pre>
        <code>{component.value}</code>
    </pre>
{:else if component.type === 'displayMath'}
    <MathExpr expr={component.value} mode={'display'} />
{/if}
