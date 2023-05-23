<script lang="ts">
    import deleteRoom from "@/utils/deleteRoom";
    import sleep from "@/utils/sleep";
    import Icon from "@iconify/svelte";
    import type { Room } from "@prisma/client";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { createEventDispatcher } from "svelte";
    import moment from "moment";
    import LoadingOverlay from "@/lib/components/LoadingOverlay.svelte";
    import { fade, fly } from "svelte/transition";

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
    in:fade
    class="card p-3 min-w-[250px] flex flex-col justify-between max-md:min-w-[100px] relative"
>
    {#if loading}
        <LoadingOverlay scale={0.5} />
    {/if}

    <div>
        <div class="font-bold text-lg flex items-center gap-2">
            {room.name}
            {#if room.visibility === "public"}
                <Icon icon="material-symbols:public" />
            {/if}
            {#if room.visibility === "unlisted"}
                <Icon icon="el:paper-clip" />
            {/if}
            {#if room.visibility === "private"}
                <Icon icon="material-symbols:lock" />
            {/if}
        </div>
        <hr class="my-2" />
        <div class="text-muted font-thin">
            {room.description}
        </div>
    </div>

    <!-- Actions -->
    <div class="mt-3 flex w-full justify-between items-end">
        <div class="font-thin italic text-xs text-muted flex justify-end">
            Created {moment(room.createdAt).fromNow()}
        </div>

        <div class="flex-center gap-2">
            <button
                on:click={handleDelete}
                class="btn variant-ghost-error p-2 max-md:btn-sm"
            >
                <Icon
                    icon="mdi:delete"
                    class="text-base text-red-500 dark:text-white"
                />
            </button>
            <a
                href={`/r/${room.name}`}
                class="btn btn-sm variant-filled-primary py-2">Join</a
            >
        </div>
    </div>
</div>
