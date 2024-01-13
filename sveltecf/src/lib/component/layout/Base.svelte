<script lang="ts">
    import Bottom from '$lib/component/logic/Bottom.svelte';
</script>

<Bottom>
    <header>
        <slot name="header" />
    </header>
    <main>
        <slot name="main" />
    </main>
    <footer>
        <slot name="footer" />
    </footer>
</Bottom>

<style>
    footer {
        margin-top: 1rem;
        padding: 1rem;
        color: var(--red-6);
        text-align: center;
    }
</style>
