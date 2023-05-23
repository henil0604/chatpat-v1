<script lang="ts">
    import RoomCard from "@/routes/dashboard/RoomCard.svelte";
    import { loading } from "@/store";
    import fetchUserRooms from "@/utils/fetchUserRooms";
    import type { Room } from "@prisma/client";
    import { onMount } from "svelte";
    import Typewriter from "svelte-typewriter/Typewriter.svelte";
    import { fade } from "svelte/transition";

    let rooms: Room[];

    onMount(async () => {
        loading.set(false);
        // loading.set(true);
        rooms = await fetchUserRooms();
    });

    async function onDeleteHandler({ detail }: { detail: Room }) {
        rooms = rooms.filter((e) => e.name !== detail.name);

        rooms = await fetchUserRooms();
    }
</script>

<div class="p-4">
    <div class="flex justify-between">
        <Typewriter>
            <h4>Your Rooms</h4>
        </Typewriter>
        <a href="/dashboard/create" class="btn btn-sm variant-filled-primary"
            >Create</a
        >
    </div>
    <hr class="mt-2 mb-5" />
    {#if rooms && rooms.length === 0}
        <p class="text-center text-muted italic w-full">Nothing to see here</p>
    {/if}
    <div
        class="grid grid-cols-4 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2"
    >
        {#if rooms}
            {#each rooms as room}
                <RoomCard on:deletedMe={onDeleteHandler} {room} />
            {/each}
        {:else}
            {#each Array(8) as _}
                <div
                    in:fade
                    class="card p-3 min-w-[250px] max-md:min-w-[100px] relative flex gap-3 flex-col"
                >
                    <div class="placeholder" />
                    <div class="placeholder" />
                    <div class="placeholder" />
                </div>
            {/each}
        {/if}
    </div>
</div>
