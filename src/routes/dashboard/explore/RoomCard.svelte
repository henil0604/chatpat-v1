<script lang="ts">
    import Loading from "@/lib/components/Loading.svelte";
    import Icon from "@iconify/svelte";
    import type { Room } from "@prisma/client";
    import moment from "moment";

    export let room: Room;

    let loading = false;
</script>

<div class="card p-3 min-w-[250px] max-md:min-w-[100px] relative">
    {#if loading}
        <div
            class="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-[999] flex-center"
        >
            <Loading width="28px" />
        </div>
    {/if}

    <div class="font-bold text-lg">{room.name}</div>
    <hr class="my-2" />
    <p class="text-muted font-thin">
        {room.description}
    </p>

    <!-- Actions -->
    <div class="mt-3 flex w-full justify-between items-center">
        <div class="font-thin italic text-xs text-muted flex justify-end">
            Created {moment(room.createdAt).fromNow()}
        </div>
        <div class="flex-center">
            <a
                href={`/r/${room.name}`}
                class="btn btn-sm variant-filled-primary max-md:btn-sm">Join</a
            >
        </div>
    </div>
</div>
