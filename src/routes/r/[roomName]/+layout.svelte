<script lang="ts">
    import { page } from "$app/stores";
    import {
        loading,
        originalRoomPassword,
        pusherChannel,
        roomAccessAllowed,
        roomStore,
    } from "@/store";
    import { AppShell } from "@skeletonlabs/skeleton";
    import { onDestroy, onMount } from "svelte";
    import Header from "@/routes/r/[roomName]/Header.svelte";
    import Footer from "@/routes/r/[roomName]/Footer.svelte";
    import type { Room } from "@prisma/client";
    import PasswordCard from "@/routes/r/[roomName]/PasswordCard.svelte";
    import { fly } from "svelte/transition";

    const roomName: string = $page.params.roomName;
    const room: Room = $page.data.room;

    onMount(() => {
        if (room) {
            roomStore.set(room);
            console.log(room);
            !$loading && loading.set(true);

            if (room.visibility == "private") {
                roomAccessAllowed.set(false);
            } else {
                roomAccessAllowed.set(true);
            }
        }

        loading.set(false);
    });

    onDestroy(() => {
        if ($pusherChannel) {
            $pusherChannel.unbind_all();
            $pusherChannel.disconnect();
        }
        pusherChannel.set(null);
        roomAccessAllowed.set(undefined);
        originalRoomPassword.set(null);
        roomStore.set(null);
    });
</script>

{#if !room}
    <!-- 404 -->
    <div class="flex-center h-full">
        <div
            class="card variant-ghost-primary flex flex-col p-4 max-w-[500px] max-md:max-w-none"
        >
            <h3 class="font-bold">Room not found</h3>
            <hr class="my-3" />
            <div class="font-thin">
                Sorry but the Room <span class="font-bold italic highlighted"
                    >{roomName}</span
                > does not exists.
            </div>
            <div class="mt-3" />
            <div class="w-full flex justify-end">
                <a href="/dashboard" class="btn variant-filled">Go Back</a>
            </div>
        </div>
    </div>
{:else}
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
{/if}
