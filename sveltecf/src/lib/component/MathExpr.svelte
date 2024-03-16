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
</script>

{#if mode === 'inline'}
    <span>
        {@html katex.renderToString(
            expr,
            options,
        )}<!-- eslint-disable-line svelte/no-at-html-tags -->
    </span>
{:else if mode === 'display'}
    <div>
        {@html katex.renderToString(
            expr,
            options,
        )}<!-- eslint-disable-line svelte/no-at-html-tags -->
    </div>
{/if}

<style>
    div {
        overflow: scroll;
    }
</style>
