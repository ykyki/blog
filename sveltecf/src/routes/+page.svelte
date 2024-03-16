<script lang="ts">
    import { format } from 'date-fns';
    import type { PageData } from './$types';
    import { resolveRoute } from '$app/paths';
    import MetadataList from '$lib/component/MetadataList.svelte';

    export let data: PageData;

    const { articles, posts } = data;
    const dateFormat = 'yyyy-MM-dd';
</script>

<div class="base">
    <section>
        <h2>Post</h2>
        <dl class="list">
            {#each posts as post}
                <div class="post">
                    <dt>
                        {#if post.url !== undefined}
                            <a href={post.url}>{post.title}</a>
                        {:else}
                            {post.title}
                        {/if}
                    </dt>
                    <dd>
                        <MetadataList
                            items={{
                                posted: format(post.postDate, dateFormat),
                                description: post.description,
                            }} />
                    </dd>
                </div>
            {/each}
        </dl>
    </section>

    <section>
        <h2>Article</h2>
        <dl class="list">
            {#each articles as article}
                {@const articlePath = resolveRoute('/article/[slug]', {
                    slug: article.frontmatter.slug,
                })}
                <div class="article">
                    <dt><a href={articlePath}>{article.title}</a></dt>
                    <dd>
                        <MetadataList
                            items={{
                                created: format(
                                    article.frontmatter.createdAt,
                                    dateFormat,
                                ),
                                updated: format(
                                    article.frontmatter.updatedAt,
                                    dateFormat,
                                ),
                                tags: article.frontmatter.tags,
                            }} />
                    </dd>
                </div>
            {/each}
        </dl>
    </section>
</div>

<style>
    a {
        text-decoration: underline;
        &:hover {
            color: var(--text-2);
        }
        &:visited {
            color: var(--link-visited);
        }
    }

    .base {
        display: flex;
        flex-direction: column;
        gap: var(--size-6);
    }

    dl.list {
        display: flex;
        flex-direction: column;
        gap: var(--size-3);
        & > div > dt {
            min-width: 100%;
            font-size: var(--font-size-4);
        }
        & > div > dd {
            min-width: 100%;
            font-size: var(--font-size-1);
        }
    }
</style>
