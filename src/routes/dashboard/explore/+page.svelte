<script lang="ts">
    import { loading } from "@/store";
    import fetchExploreFeed from "@/utils/fetchExploreFeed";
    import type { Room } from "@prisma/client";
    import { onMount } from "svelte";
    import RoomCard from "@/routes/dashboard/explore/RoomCard.svelte";

    let fetchedRooms: Room[] = [];

    onMount(async () => {
        loading.set(true);

        let fetchedRoomsResponse = await fetchExploreFeed();

        if (!fetchedRoomsResponse) {
            loading.set(false);
            return;
        }

        fetchedRooms = fetchedRoomsResponse;

        loading.set(false);
    });
</script>

<div class="container flex-col p-4 max-sm:px-2">
    <div class="p-4">
        <div class="flex justify-between">
            <h4>Explore</h4>
        </div>
        <hr class="mt-2 mb-5" />
        {#if fetchedRooms && fetchedRooms.length === 0}
            <p class="text-center text-muted italic w-full">
                Nothing to see here
            </p>
        {/if}
        <div
            class="grid grid-cols-4 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2"
        >
            {#if fetchedRooms}
                {#each fetchedRooms as room}
                    <RoomCard {room} />
                {/each}
            {:else}
                <div class="card max-w-[300px] p-4 flex gap-3 flex-col">
                    <div class="placeholder" />
                    <div class="placeholder" />
                    <div class="placeholder" />
                </div>
            {/if}
        </div>
    </div>
</div>
