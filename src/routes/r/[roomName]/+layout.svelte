<script>
    import { page } from "$app/stores";
    import { loading } from "@/store";
    import { AppShell } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import Header from "@/routes/r/[roomName]/Header.svelte";

    const room = $page.data.room;

    onMount(() => {
        console.log(room);
        loading.set(false);
    });
</script>

<AppShell>
    <svelte:fragment slot="header"><Header /></svelte:fragment>
    <slot />
</AppShell>
