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
    header,
    main,
    footer {
        width: 100%;
        max-width: 768px;
        margin: 0 auto;
        padding: 0 var(--size-2);
    }
</style>
