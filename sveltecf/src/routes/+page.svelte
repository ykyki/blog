<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import { resolveRoute } from '$app/paths';
    import type { PageData } from './$types';

    export let data: PageData;

    const { articles } = data;
</script>

<BlogBase>
    <p><b>🚧under construction🚧</b></p>

    <section>
        <p>TODO: このブログの紹介文</p>
    </section>

    <section>
        <h2>Latest</h2>
        <section>
            <h3>Post</h3>
            <p>TODO</p>
        </section>
        <section>
            <h3>Article</h3>
            {#each articles as article}
                {@const articlePath = resolveRoute('/article/[slug]', {
                    slug: article.frontmatter.slug,
                })}
                <section>
                    <h4><a href={articlePath}>{article.title}</a></h4>
                    <p>created: {article.frontmatter.createdAt.toString()}</p>
                    <p>updated: {article.frontmatter.updatedAt.toString()}</p>
                    <p>tags: {article.frontmatter.tags.join(', ')}</p>
                </section>
            {/each}
        </section>
    </section>

    <section>
        <h2>Navigation</h2>
        <p>TODO</p>
    </section>
</BlogBase>

<style>
    a {
        text-decoration: underline;

        &:hover {
            color: var(--text-2);
        }
    }

    a:visited {
        color: var(--link-visited);
    }
</style>
