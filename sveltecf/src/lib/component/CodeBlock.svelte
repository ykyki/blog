<script lang="ts">
    import { codeToHtml } from 'shiki';

    export let code: string;
    export let lang: string | undefined;

    $: rendered = codeToHtml(code, {
        lang: lang ?? 'plaintext',
        theme: 'andromeeda',
    });
</script>

{#await rendered}
    <pre><code>{code}</code></pre>
{:then value}
    <!-- eslint-disable-line svelte/no-at-html-tags -->{@html value}
{/await}

<style>
    :global(pre) {
        min-width: 100%;
        padding: var(--size-2);
        overflow: scroll;
        border: var(--border-size-1) solid var(--gray-1);
        background-color: var(--surface-2);
    }
    :global(code) {
        width: 100%;
        font-family: var(--font-mono);
        letter-spacing: var(--font-letterspacing-0);
    }
</style>
