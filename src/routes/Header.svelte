<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        EMAIL_HANDLE,
        GITHUB_REPO_LINK,
        TWITTER_HANDLE_LINK,
    } from "@/const";
    import Icon from "@iconify/svelte";
    import { AppBar } from "@skeletonlabs/skeleton";
    import Typewriter from "svelte-typewriter/Typewriter.svelte";
</script>

<AppBar padding="px-4 py-3">
    <svelte:fragment slot="lead">
        <Typewriter mode="scramble" scrambleDuration={2000}>
            <div class="text-2xl max-md:text-lg font-bold">ChatPat</div>
        </Typewriter>
    </svelte:fragment>

    <svelte:fragment slot="trail">
        <a target="_blank" href="mailto:{EMAIL_HANDLE}" class=""
            ><Icon
                class="text-3xl transition duration-100 hover:text-red-500"
                icon="material-symbols:mail-outline-sharp"
            /></a
        >
        <a target="_blank" href={TWITTER_HANDLE_LINK} class=""
            ><Icon
                class="text-3xl transition duration-100 hover:text-blue-500"
                icon="mdi:twitter"
            /></a
        >
        <a target="_blank" href={GITHUB_REPO_LINK} class=""
            ><Icon
                class="text-3xl transition duration-100 hover:text-slate-800 dark:hover:text-slate-200"
                icon="mdi:github"
            /></a
        >
    </svelte:fragment>
</AppBar>
