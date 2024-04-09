<script lang="ts">
    import Icon from '@iconify/svelte';
    import { base } from '$app/paths';
</script>

<div class="footer">
    <div class="icons">
        <a href="{base}/"><Icon icon="ion:home-sharp" /></a>
        <a href="https://github.com/ykyki"><Icon icon="mdi:github" /></a>
        <a href="https://github.com/ykyki/blog"
            ><Icon icon="mdi:file-code" /></a>
    </div>
    <p class="copyright">Copyright &copy; ykyki. 2024. All rights reserved.</p>
</div>

<style>
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: var(--size-3);
    }
    @media (width < 768px) {
        .footer {
            display: flex;
            flex-direction: column;
        }
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

    .copyright {
        color: var(--text-2);
        font-size: var(--font-size-0);
    }
</style>
