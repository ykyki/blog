<script lang="ts">
    import Icon from '@iconify/svelte';
    import { resolveRoute } from '$app/paths';
</script>

<div class="footer">
    <div class="icons">
        <a href={resolveRoute('/', {})}><Icon icon="ion:home-sharp" /></a>
        <a href="https://github.com/ykyki"><Icon icon="mdi:github" /></a>
        <a href="https://github.com/ykyki/blog"
            ><Icon icon="mdi:file-code" /></a>
    </div>
    <p>Copyright &copy; ykyki. 2024. All rights reserved.</p>
</div>

<style>
    .footer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: var(--size-3);
    }

    .icons {
        display: flex;
        gap: var(--size-4);
    }

    .icons :global(svg) {
        display: inline;
        font-size: var(--font-size-5);
        color: var(--text-1);
    }
</style>
