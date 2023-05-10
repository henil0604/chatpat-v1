<script lang="ts">
    import type { Room } from "@prisma/client";

    export let room: Room;
</script>

<div class="card variant-soft-primary p-3 min-w-[250px]">
    <div class="font-bold text-lg">{room.name}</div>
    <hr class="my-2" />
    <p class="text-muted font-thin">{room.description}</p>

    <!-- Actions -->
    <div class="mt-4 flex gap-2 w-full justify-end">
        <a href={`/r/${room.name}`} class="btn btn-sm variant-filled-primary"
            >Join</a
        >
    </div>
</div>
