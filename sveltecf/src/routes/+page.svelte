<script lang="ts">
    import { resolveRoute } from '$app/paths';
    import type { PageData } from './$types';
    import { format } from 'date-fns';

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
                        <dl class="meta">
                            <div>
                                <dt>posted</dt>
                                <dd>
                                    {format(post.postDate, dateFormat)}
                                </dd>
                            </div>
                            <div>
                                {#if post.description !== undefined}
                                    <dt>description</dt>
                                    <dd>
                                        {post.description}
                                    </dd>
                                {/if}
                            </div>
                        </dl>
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
                        <dl class="meta">
                            <div>
                                <dt>created</dt>
                                <dd>
                                    {format(
                                        article.frontmatter.createdAt,
                                        dateFormat,
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt>updated</dt>
                                <dd>
                                    {format(
                                        article.frontmatter.updatedAt,
                                        dateFormat,
                                    )}
                                </dd>
                            </div>
                            <div class="tags">
                                <dt>tag</dt>
                                <dd>
                                    <ul>
                                        {#each article.frontmatter.tags as tag}
                                            <li>
                                                {tag}
                                            </li>
                                        {/each}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
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

    dl.meta {
        display: flex;
        flex-direction: row;
        gap: var(--size-3);
        & > div:last-child {
            flex-grow: 1;
        }

        & > div > dt {
            min-width: 100%;
            font-size: var(--font-size-1);
            font-weight: var(--font-weight-9);
        }
        & > div > dd {
            min-width: 100%;
            font-size: var(--font-size-1);
            font-weight: var(--font-weight-1);
        }
    }

    div.tags {
        & ul {
            padding: 0;
        }
        & li {
            padding: 0;
            display: inline;
        }
    }
</style>
