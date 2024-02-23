<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<article>
    <h1>About</h1>

    <section class="me">
        <h2>Me</h2>
        <section>
            <h3>Link</h3>
            <table>
                <tr>
                    <th>GitHub</th>
                    <td
                        ><a href="https://github.com/ykyki"
                            ><Icon icon="mdi:github" /></a>
                    </td>
                    <td>
                        <a href="https://github.com/ykyki"
                            >https://github.com/ykyki</a
                        ></td>
                </tr>
                <tr>
                    <th>Zenn</th>
                    <td
                        ><a href="https://zenn.dev/ykyki"
                            ><Icon icon="simple-icons:zenn" /></a>
                    </td>
                    <td>
                        <a href="https://zenn.dev/ykyki"
                            >https://zenn.dev/ykyki</a
                        ></td>
                </tr>
                <tr>
                    <th>Bluesky</th>
                    <td
                        ><a href="https://bsky.app/profile/ykyki.bsky.social"
                            ><Icon icon="ri:bluesky-fill" /></a>
                    </td>
                    <td
                        ><a href="https://bsky.app/profile/ykyki.bsky.social"
                            >https://bsky.app/profile/ykyki.bsky.social</a
                        ></td>
                </tr>
            </table>
        </section>
    </section>

    <section>
        <h2>Blog</h2>
        <p>このブログについて</p>
    </section>
</article>

<style>
    h1 {
        color: var(--yellow-4);
    }

    article {
        display: flex;
        flex-direction: column;
        gap: var(--size-3);
    }

    article > section {
        display: flex;
        flex-direction: column;
        gap: var(--size-2);
    }

    table {
        min-width: 70%;
        margin: var(--size-1) auto;
        border-radius: var(--radius-conditional-2);
    }

    table :global(svg) {
        display: inline;
        font-size: var(--font-size-4);
        min-width: var(--size-4);
        vertical-align: middle;
        color: var(--text-1);
    }

    table td {
        word-break: break-all;
    }
</style>
