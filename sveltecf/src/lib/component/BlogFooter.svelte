<script lang="ts">
    import Logo from '$lib/component/Logo.svelte';
</script>

<section>
    <h1><Logo /></h1>
    <p>copyright</p>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    section > * {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    h1 {
        font-size: unset;
    }
</style>
