<script lang="ts">
    import { page } from "$app/stores";
    import { loading, roomAccessAllowed } from "@/store";
    import { AppShell } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import Header from "@/routes/r/[roomName]/Header.svelte";
    import Footer from "@/routes/r/[roomName]/Footer.svelte";
    import { Visibility, type Room } from "@prisma/client";
    import PasswordCard from "@/routes/r/[roomName]/PasswordCard.svelte";

    const room: Room = $page.data.room;

    onMount(() => {
        console.log(room);
        !$loading && loading.set(true);

        if (room.visibility == Visibility.PRIVATE) {
            roomAccessAllowed.set(false);
        } else {
            roomAccessAllowed.set(true);
        }

        loading.set(false);
    });
</script>

{#if !room}
    404
{/if}

{#if $roomAccessAllowed === undefined}
    <div />
{/if}

{#if $roomAccessAllowed === true}
    <AppShell>
        <svelte:fragment slot="header"><Header /></svelte:fragment>
        <slot />
        <svelte:fragment slot="footer"><Footer /></svelte:fragment>
    </AppShell>
{/if}

{#if $roomAccessAllowed === false}
    <AppShell>
        <svelte:fragment slot="header"><Header /></svelte:fragment>
        <div class="flex-center h-full max-md:h-fit max-md:mt-4">
            <PasswordCard />
        </div>
    </AppShell>
{/if}
