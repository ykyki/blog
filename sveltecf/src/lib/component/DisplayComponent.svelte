<script lang="ts">
    import { codeToHtml } from 'shiki';
    import type { Schema } from 'uniproc';
    import InlineComponent from '$lib/component/InlineComponent.svelte';
    import MathExpr from '$lib/component/MathExpr.svelte';

    export let component: Schema.DisplayComponent | Schema.Heading;
</script>

<div class="base">
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
        {#await codeToHtml( component.value, { lang: component.lang ?? 'plaintext', theme: 'andromeeda' }, )}
            <pre><code>{component.value}</code></pre>
        {:then value}
            <!-- eslint-disable-line svelte/no-at-html-tags -->{@html value}
        {/await}
    {:else if component.type === 'displayMath'}
        <MathExpr expr={component.value} mode={'display'} />
    {/if}
</div>

<style>
    p {
        min-width: 100%;
    }
    li {
        min-width: 100%;
        white-space: pre-wrap;
    }
    .base :global(pre) {
        min-width: 100%;
        padding: var(--size-2);
        overflow: scroll;
        border: var(--border-size-1) solid var(--gray-1);
        background-color: var(--surface-2);
    }
    .base :global(code) {
        width: 100%;
        font-family: var(--font-mono);
        letter-spacing: var(--font-letterspacing-0);
    }
</style>
