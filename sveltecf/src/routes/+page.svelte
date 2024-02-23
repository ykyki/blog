<script lang="ts">
    import BlogBase from '$lib/component/layout/BlogBase.svelte';
    import { resolveRoute } from '$app/paths';
    import type { PageData } from './$types';
    import { format } from 'date-fns';

    export let data: PageData;

    const { articles } = data;
</script>

<BlogBase>
    <div class="base">
        <section>
            <h2>Post</h2>
            <p>TODO</p>
        </section>

        <section>
            <h2>Article</h2>
            <div class="article-list">
                {#each articles as article}
                    {@const articlePath = resolveRoute('/article/[slug]', {
                        slug: article.frontmatter.slug,
                    })}
                    {@const dateFormat = 'yyyy-MM-dd'}
                    <dl class="article">
                        <div>
                            <dt><a href={articlePath}>{article.title}</a></dt>
                            <dd>
                                <dl class="article-meta">
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
                                        <dt>tags</dt>
                                        <dd>
                                            <ul>
                                                {#each article.frontmatter.tags as tag}
                                                    <li>
                                                        <!-- <a
                                                            href={resolveRoute(
                                                                '/tag/[tag]',
                                                                {
                                                                    tag,
                                                                },
                                                            )}>{tag}</a> -->
                                                        {tag}
                                                    </li>
                                                {/each}
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </dd>
                        </div>
                    </dl>
                {/each}
            </div>
        </section>
    </div>
</BlogBase>

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

    .article-list {
        display: flex;
        flex-direction: column;
        gap: var(--size-3);
    }

    dl.article {
        & > div > dt {
            font-size: var(--font-size-4);
        }
    }

    dl.article-meta {
        display: flex;
        flex-direction: row;
        gap: var(--size-3);
        & > div > dt {
            font-size: var(--font-size-1);
            font-weight: var(--font-weight-5);
        }
        & > div > dd {
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
