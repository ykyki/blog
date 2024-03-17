<script lang="ts">
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

    $: rendered = katex.renderToString(expr, options);
</script>

{#if mode === 'inline'}
    <span>
        <!-- eslint-disable-line svelte/no-at-html-tags -->{@html rendered}
    </span>
{:else if mode === 'display'}
    <div>
        <!-- eslint-disable-line svelte/no-at-html-tags -->{@html rendered}
    </div>
{/if}

<style>
    div {
        overflow: scroll;
    }
</style>
