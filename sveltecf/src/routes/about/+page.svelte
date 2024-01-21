<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import Icon from '@iconify/svelte';
</script>

<BlogBase>
    <article>
        <h1>About</h1>
        <p><b>🚧under construction🚧</b></p>
        <h2>Links</h2>
        <ol>
            <li>
                GitHub<Icon icon="mdi:github" />:
                <a href="https://github.com/ykyki">https://github.com/ykyki</a>
            </li>
            <li>
                Zenn<Icon icon="simple-icons:zenn" />:
                <a href="https://zenn.dev/ykyki">https://zenn.dev/ykyki</a>
            </li>
            <li>
                Bluesky<Icon icon="ri:bluesky-fill" />:
                <a href="https://bsky.app/profile/ykyki.bsky.social"
                    >https://bsky.app/profile/ykyki.bsky.social</a>
            </li>
        </ol>
    </article>
</BlogBase>

<style>
    :global(svg) {
        display: inline;
        font-size: var(--font-size-4);
        margin: 0 var(--size-1);
    }
</style>
