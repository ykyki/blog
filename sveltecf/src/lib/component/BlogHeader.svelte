<script lang="ts">
    import Logo from '$lib/component/Logo.svelte';
    import { base } from '$app/paths';
</script>

<div>
    <nav>
        <Logo size="large" />
        <div>
            <a href="{base}/about">About</a>
            <a href="{base}/article">Article</a>
        </div>
    </nav>
</div>

<style>
    nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: baseline;
        gap: var(--size-1);

        & > div {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: baseline;
            gap: var(--size-2);
        }

        & a {
            color: var(--color-on-primary);
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
