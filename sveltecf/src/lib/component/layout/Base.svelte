<script lang="ts">
    import Bottom from '$lib/component/logic/Bottom.svelte';
</script>

<Bottom>
    <header>
        <slot name="header" />
    </header>
    <main>
        <slot name="main"/>
    </main>
    <footer>
        <slot name="footer" />
    </footer>
</Bottom>
