<script lang="ts">
    import Base from '$lib/component/layout/Base.svelte';
    import BlogHeader from '$lib/component/BlogHeader.svelte';
    import BlogFooter from '$lib/component/BlogFooter.svelte';
</script>

<Base>
    <BlogHeader slot="header" />
    <svelte:fragment slot="main">
        <slot />
    </svelte:fragment>
    <BlogFooter slot="footer" />
</Base>
