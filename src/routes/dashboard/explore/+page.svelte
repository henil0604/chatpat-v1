<script lang="ts">
    import { loading } from "@/store";
    import fetchExploreFeed from "@/utils/fetchExploreFeed";
    import type { Room } from "@prisma/client";
    import { onMount } from "svelte";
    import RoomCard from "@/routes/dashboard/explore/RoomCard.svelte";
    import Icon from "@iconify/svelte";

    let fetchedRooms: Room[] = [];
    let rooms: Room[] = [];

    let searchQuery = "";

    onMount(async () => {
        loading.set(true);

        let fetchedRoomsResponse = await fetchExploreFeed();

        if (!fetchedRoomsResponse) {
            loading.set(false);
            return;
        }

        fetchedRooms = fetchedRoomsResponse;
        rooms = fetchedRooms;

        loading.set(false);
    });

    function handleSearch() {
        if (searchQuery.trim() === "") {
            rooms = fetchedRooms;
            return;
        }

        rooms = fetchedRooms.filter((room) => {
            return (
                room.name
                    .toLocaleLowerCase()
                    .includes(searchQuery.toLocaleLowerCase()) ||
                room.description
                    .toLocaleLowerCase()
                    .includes(searchQuery.toLocaleLowerCase())
            );
        });

        return;
    }
</script>

<div class="container flex-col p-4 max-sm:px-2">
    <div class="p-4">
        <div class="flex justify-between items-end">
            <h4>Explore</h4>
            <!-- Search -->
            <div
                class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[200px]"
            >
                <div class="input-group-shim">
                    <Icon class="text-lg" icon="mdi:search" />
                </div>
                <input
                    bind:value={searchQuery}
                    on:input={handleSearch}
                    type="search"
                    class="text-sm max-md:text-xs"
                    placeholder="Search..."
                />
            </div>
        </div>
        <hr class="mt-2 mb-5" />
        {#if !$loading && fetchedRooms && fetchedRooms.length === 0}
            <p class="text-center text-muted italic w-full">
                Nothing to see here
            </p>
        {/if}
        <div
            class="grid grid-cols-4 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2"
        >
            {#if $loading}
                {#each Array(8) as _}
                    <div
                        class="card p-3 min-w-[250px] max-md:min-w-[100px] relative flex gap-3 flex-col"
                    >
                        <div class="placeholder" />
                        <div class="placeholder" />
                        <div class="placeholder" />
                    </div>
                {/each}
            {/if}
            {#if rooms && !$loading}
                {#each rooms as room}
                    <RoomCard {room} />
                {/each}
            {/if}
        </div>
    </div>
</div>
