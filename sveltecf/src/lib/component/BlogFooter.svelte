<script lang="ts">
    import { base } from '$app/paths';
</script>

<section>
    <h1><a href="{base}/"><span class="logo">blog.ykyki.net</span></a></h1>
    <p>copyright</p>
</section>

<style>
    section {
        text-align: center;
    }
    h1 {
        /* line-height: var(--font-lineheight-00); */
        height: fit-content;
    }
    a {
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    .logo {
        font-family: var(--font-sans);
        font-size: var(--font-size-5);
        font-weight: var(--font-weight-7);
        letter-spacing: var(--font-letterspacing-0);
        background: var(--gradient-19);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
