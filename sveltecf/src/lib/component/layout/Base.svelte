<script lang="ts">
    import Bottom from '$lib/component/logic/Bottom.svelte';
</script>

<Bottom>
    <div class="base">
        <header>
            <slot name="header" />
        </header>
        <div>
            <div class="line" />
        </div>
        <main>
            <slot name="main" />
        </main>
        <div>
            <div class="line" />
        </div>
        <footer>
            <slot name="footer" />
        </footer>
    </div>
</Bottom>

<style>
    .base {
        padding: 0 var(--size-4);
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        & > :nth-last-child(2) {
            margin-top: auto;
        }

        & > * {
            width: 100%;
            max-width: var(--size-md);
            margin: 0 auto;
        }
    }

    .line {
        height: 0;
        border: var(--border-size-1) solid var(--surface-4);
        margin: var(--size-2) 0;
    }

    :global(h1) {
        font-size: var(--font-size-6);
        min-width: 100%;
    }
    :global(h2) {
        font-size: var(--font-size-5);
        min-width: 100%;
    }
    :global(h3) {
        font-size: var(--font-size-4);
        min-width: 100%;
    }

    @media (width < 768px) {
        :global(h1) {
            font-size: var(--font-size-5);
        }
        :global(h2) {
            font-size: var(--font-size-4);
        }
        :global(h3) {
            font-size: var(--font-size-3);
        }
    }
</style>
