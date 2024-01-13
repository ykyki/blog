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
    .base > * {
        width: 100%;
        max-width: 768px;
        margin: 0 auto;
        padding: 0 var(--size-4);
    }

    .line {
        height: 0;
        border: var(--border-size-1) solid var(--surface-4);
        margin: var(--size-4) 0;
    }
</style>
