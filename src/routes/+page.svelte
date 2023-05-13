<script>
    import { APP_NAME, APP_TAGLINE } from "@/const";
    import { loading } from "@/store";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    onMount(() => {
        loading.set(false);
    });
</script>

<svelte:head>
    <title>{APP_NAME} - {APP_TAGLINE}</title>
</svelte:head>

<div class="w-full min-h-screen bg-brand">
    <main
        class="w-full h-screen bg-brand flex-center flex-col text-white transition-all"
    >
        <h1 class="text-6xl font-extrabold max-sm:text-5xl">{APP_NAME}</h1>
        <div class="my-1 max-sm:my-0" />
        <div class="text-md italic max-sm:text-sm">{APP_TAGLINE}</div>
        <div class="my-6 max-sm:my-4" />

        <a class="btn btn-dark" href="/dashboard">Open Dashboard</a>
        <div class="my-6 max-sm:my-4" />
        <div class="flex gap-3">
            <a
                class="btn btn-sm bg-white hover:bg-gray-300 text-blue-700 border-none"
                target="_blank"
                href="https://twitter.com/realchatpat"
                ><Icon class="text-2xl" icon="mdi:twitter" /></a
            >
            <a
                class="btn btn-sm bg-white hover:bg-gray-300 text-red-700 border-none"
                target="_blank"
                href="mailto:chatpat@henil.xyz"
                ><Icon
                    class="text-2xl"
                    icon="material-symbols:mail-outline"
                /></a
            >
        </div>
    </main>
</div>
