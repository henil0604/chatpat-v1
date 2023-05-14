<script lang="ts">
    import Loading from "@/lib/components/Loading.svelte";
    import deleteRoom from "@/utils/deleteRoom";
    import sleep from "@/utils/sleep";
    import Icon from "@iconify/svelte";
    import type { Room } from "@prisma/client";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { createEventDispatcher } from "svelte";
    import moment from "moment";

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

<div class="card p-3 min-w-[250px] max-md:min-w-[100px] relative">
    {#if loading}
        <div
            class="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-[999] flex-center"
        >
            <Loading width="28px" />
        </div>
    {/if}

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

    <!-- Actions -->
    <div class="mt-3 flex w-full justify-between items-center">
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
