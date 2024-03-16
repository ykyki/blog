<script lang="ts">
    export let items: Record<string, undefined | string | string[]>;
</script>

<dl class="metadata">
    {#each Object.entries(items) as [key, value]}
        <div>
            <dt>{key}</dt>
            <dd>
                {#if typeof value === 'string'}{value}{:else if Array.isArray(value)}
                    <ul>
                        {#each value as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                {/if}
            </dd>
        </div>
    {/each}
</dl>

<style>
    dl.metadata {
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

    dd > ul {
        padding: 0;

        & > li {
            padding: 0;
            display: inline;

            &:not(:first-child)::before {
                content: ', ';
            }
        }
    }
</style>
