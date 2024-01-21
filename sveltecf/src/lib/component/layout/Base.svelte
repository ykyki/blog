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
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        & > :nth-last-child(2) {
            margin-top: auto;
        }

        & > * {
            width: 100%;
            max-width: 768px;
            margin: 0 auto;
        }
    }

    .line {
        height: 0;
        border: var(--border-size-1) solid var(--surface-4);
        margin: var(--size-2) 0;
    }
</style>
