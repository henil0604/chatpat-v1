<script>
    import { APP_NAME, APP_TAGLINE } from "@/const";
    import { loading } from "@/store";
    import { onMount } from "svelte";
    import { AppShell } from "@skeletonlabs/skeleton";
    import Header from "@/routes/Header.svelte";
    import Typewriter, { concurrent } from "svelte-typewriter";

    onMount(() => {
        loading.set(false);
    });
</script>

<svelte:head>
    <title>{APP_NAME} - {APP_TAGLINE}</title>
</svelte:head>

<AppShell>
    <svelte:fragment slot="header"><Header /></svelte:fragment>

    <div class="w-full h-full flex items-center pt-[100px] flex-col">
        <!-- App Name -->
        <div class="text-7xl max-md:text-6xl font-extrabold">
            {APP_NAME}
        </div>

        <Typewriter interval={40}>
            <div class="text-muted italic max-md:text-sm">{APP_TAGLINE}</div>
        </Typewriter>

        <div class="mt-10" />

        <a href="/dashboard" class="btn variant-ghost-primary">Open App</a>

        <div class="mt-10" />
    </div>
</AppShell>
