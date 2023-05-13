<script lang="ts">
    import Loading from "@/lib/components/Loading.svelte";
    import deleteRoom from "@/utils/deleteRoom";
    import sleep from "@/utils/sleep";
    import Icon from "@iconify/svelte";
    import type { Room } from "@prisma/client";
    import { ProgressRadial, toastStore } from "@skeletonlabs/skeleton";
    import { createEventDispatcher } from "svelte";

    export let room: Room;

    let loading = false;

    const dispatch = createEventDispatcher();

    function handleDelete() {
        toastStore.trigger({
            message: "Are you sure?",
            background: "variant-filled-error",
            action: {
                label: "Yes",
                response: async () => {
                    loading = true;

                    // deleting Room
                    const deleteAction = await deleteRoom(room.name);

                    loading = false;

                    // dispatching to parent component
                    dispatch("deletedMe", {
                        ...room,
                    });
                },
            },
        });
    }
</script>

<div
    class="card variant-soft-primary p-3 min-w-[250px] max-md:min-w-[100px] relative"
>
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
    <div class="mt-4 flex gap-2 w-full justify-end">
        <button
            on:click={handleDelete}
            class="btn variant-ghost-error max-md:btn-sm"
            ><Icon
                icon="mdi:delete"
                class="text-lg text-red-500 dark:text-white"
            /></button
        >
        <a
            href={`/r/${room.name}`}
            class="btn btn-sm variant-filled-primary max-md:btn-sm">Join</a
        >
    </div>
</div>
