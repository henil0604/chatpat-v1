<script lang="ts">
    import Loading from "@/lib/components/Loading.svelte";
    import type { Room, User } from "@prisma/client";
    import moment from "moment";

    export let room: Room & { owner: User };

    let loading = false;
</script>

<div
    class="card p-3 flex flex-col justify-between min-w-[250px] max-md:min-w-[100px] relative"
>
    {#if loading}
        <div
            class="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-[999] flex-center"
        >
            <Loading width="28px" />
        </div>
    {/if}

    <div>
        <div class="font-bold text-lg">{room.name}</div>
        <hr class="my-2" />
        <div class="text-muted font-thin">
            {room.description}
        </div>
    </div>

    <!-- Actions -->
    <div class="mt-3 flex w-full justify-between items-center">
        <div
            class="font-thin tracking-tighter italic text-xs text-muted flex justify-end"
        >
            Created {moment(room.createdAt).fromNow()} by
            <a class="mx-1" href="/u/{room.owner.id}">{room.owner.name}</a>
        </div>
        <div class="flex-center">
            <a
                href={`/r/${room.name}`}
                class="btn btn-sm variant-filled-primary max-md:btn-sm">Join</a
            >
        </div>
    </div>
</div>
