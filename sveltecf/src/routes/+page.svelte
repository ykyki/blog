<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const { date } = data;
</script>

<h1>blog.ykyki.net</h1>
<p>rendered at {date}</p>
