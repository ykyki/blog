<script lang="ts">
    import { onMount } from 'svelte';
    import katex, { type KatexOptions } from 'katex';
    import 'katex/dist/katex.min.css';

    export let expr: string;
    export let mode: 'inline' | 'display';

    const options: KatexOptions = {
        throwOnError: false,
        displayMode: false,
        errorColor: '#cc0000',
        strict: 'ignore',
        trust: false,
        macros: {
            '\\C': '\\mathbb{C}', // サンプル
            '\\X': '\\mathbb{X}', // サンプル
        },
        globalGroup: false,
    };

    let mathRef: HTMLSpanElement;
    onMount(() => {
        katex.render(expr, mathRef, {
            ...options,
            displayMode: mode === 'display',
        });
    });
</script>

{#if mode === 'inline'}
    <span>
        <span bind:this={mathRef} />
    </span>
{:else if mode === 'display'}
    <div>
        <span bind:this={mathRef} />
    </div>
{/if}

<style>
    div {
        overflow: scroll;
    }
</style>
