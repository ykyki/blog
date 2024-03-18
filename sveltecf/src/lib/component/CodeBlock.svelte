<script lang="ts">
    import Icon from '@iconify/svelte';
    import { codeToHtml } from 'shiki';

    export let code: string;
    export let lang: string | undefined;

    $: rendered = codeToHtml(code, {
        lang: lang ?? 'plaintext',
        theme: 'andromeeda',
    });

    let copied = false;
    let copyFailed = false;

    const handleClick = () => {
        const duration = 500;

        navigator.clipboard
            .writeText(code)
            .then(() => {
                copied = true;

                setTimeout(() => {
                    copied = false;
                }, duration);
            })
            .catch((_err) => {
                copyFailed = true;

                setTimeout(() => {
                    copyFailed = false;
                }, duration);
            });
    };
</script>

<div class="base">
    {#await rendered}
        <pre><code>{code}</code></pre>
    {:then value}
        <!-- eslint-disable-line svelte/no-at-html-tags -->{@html value}
    {/await}
    <button on:click={handleClick} class:copied class:copyFailed
        ><Icon icon="mdi:clipboard-text-multiple-outline" /></button>
</div>

<style>
    .base {
        position: relative;
    }

    .base button {
        position: absolute;
        top: var(--size-2);
        right: var(--size-2);
        padding: var(--size-1);
        cursor: pointer;
        color: var(--gray-8);
        background-color: var(--surface-4);
        border-radius: var(--size-1);
        font-size: var(--font-size-4);

        display: none;
        &:where(.base:hover > *),
        &.copied,
        &.copyFailed {
            display: block;
        }

        &.copied {
            color: var(--red-2);
            background-color: var(--gray-8);
            animation: var(--animation-bounce);
            animation-duration: 0.3s;
            animation-iteration-count: 1;
        }

        &.copyFailed {
            animation: var(--animation-shake-x);
            animation-duration: 0.3s;
            animation-iteration-count: 1;
        }
    }

    :global(pre) {
        min-width: 100%;
        padding: var(--size-2);
        overflow: scroll;
        border: var(--border-size-1) solid var(--gray-1);
        background-color: var(--surface-1);
        cursor: default;
    }

    :global(code) {
        width: 100%;
        font-family: var(--font-mono);
        letter-spacing: var(--font-letterspacing-0);
    }
</style>
