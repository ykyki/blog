<script lang="ts">
    import { base } from '$app/paths';

    export let size: 'large' | 'medium' = 'medium';
</script>

<a href="{base}/"><span class="logo {size}">blog.ykyki.net</span></a>

<style>
    .logo {
        background: var(--gradient-19);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: var(--font-sans);
        &.large {
            font-size: var(--font-size-8);
            font-weight: var(--font-weight-8);
            letter-spacing: var(--font-letterspacing-0);
        }
        &.medium {
            font-size: var(--font-size-5);
            font-weight: var(--font-weight-7);
            letter-spacing: var(--font-letterspacing-0);
        }
    }

    :is(a:hover):has(.logo) {
        text-decoration: none;
    }

    :is(span.logo)::selection {
        background: var(--blue-2);
        -webkit-text-fill-color: var(--yellow-6);
    }
</style>
