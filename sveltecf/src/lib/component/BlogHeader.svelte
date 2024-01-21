<script lang="ts">
    import Logo from '$lib/component/Logo.svelte';
    import { resolveRoute } from '$app/paths';
</script>

<div>
    <nav>
        <Logo size="large" />
        <a href={resolveRoute('/about', {})}>About</a>
    </nav>
</div>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    nav a {
        color: var(--color-on-primary);
        text-decoration: none;
    }

    nav a:hover {
        text-decoration: underline;
    }
</style>
