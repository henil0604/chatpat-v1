<script lang="ts">
    import Loading from "@/lib/components/Loading.svelte";
    import Icon from "@iconify/svelte";
    import type { Room } from "@prisma/client";

    export let room: Room;

    let loading = false;
</script>

<div
    class="card variant-soft-primary p-3 min-w-[250px] max-md:min-w-[100px] relative"
>
    {#if loading}
        <div
            class="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-[999] flex-center"
        >
            <Loading width="w-10" stroke={60} />
        </div>
    {/if}

    <div class="font-bold text-lg">{room.name}</div>
    <hr class="my-2" />
    <p class="text-muted font-thin">
        {room.description}
    </p>

    <!-- Actions -->
    <div class="mt-4 flex gap-2 w-full justify-end">
        <a
            href={`/r/${room.name}`}
            class="btn btn-sm variant-filled-primary max-md:btn-sm">Join</a
        >
    </div>
</div>
