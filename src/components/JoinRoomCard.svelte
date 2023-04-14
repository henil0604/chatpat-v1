<script lang="ts">
    import { goto } from "$app/navigation";

    // @ts-nocheck

    import { page } from "$app/stores";
    import { loading, loadingMessage } from "@/store";
    import sleep from "@/utils/sleep";
    import { IconDoorEnter } from "@tabler/icons-svelte";
    import { toasts } from "svelte-toasts";

    $: user = $page.data.user;

    let data = {
        roomName: "",
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        console.log(event);

        loading.set(true);
        loadingMessage.set("Fetching Room Data");

        try {
            const response = await fetch(`/api/room/${data.roomName}`, {
                method: "get",
            });

            console.log(response);
            // Handle Error
            if (!response.ok) {
                toasts.add({
                    title: "OOPS!",
                    duration: 5000,
                    type: "error",
                    description: (await response.json()).message as string,
                });

                loading.set(false);
                loadingMessage.set("");
                return;
            }

            toasts.add({
                title: "ooooo!",
                duration: 5000,
                type: "success",
                description: "Room Found, redirecting...",
            });
            goto(`/r/${data.roomName}`);
        } catch (e) {
            toasts.add({
                title: "OOPS!",
                duration: 5000,
                type: "error",
                description: "Something Went Wrong",
            });
            console.error(e);
        }

        await sleep(1000);
        loading.set(false);
        loadingMessage.set("");
        return false;
    }
</script>

<div>
    <input type="checkbox" id="join-room-modal" class="modal-toggle" />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <label for="join-room-modal" class="modal text-black cursor-pointer">
        <div
            class="modal-box relative min-w-fit cursor-default"
        >
            <label
                for="join-room-modal"
                class="btn btn-sm btn-circle absolute right-4 top-4">✕</label
            >
            <h3 class="font-bold text-lg">Join Room</h3>
            <hr class="my-4" />
            <form on:submit={handleSubmit}>
                <!-- Room Name -->
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Room Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="my-room"
                        class="input input-bordered w-full"
                        required
                        bind:value={data.roomName}
                    />
                </div>

                <div class="my-4" />

                <button type="submit" class="btn">Join</button>
            </form>
        </div>
    </label>

    <label
        for="join-room-modal"
        class="btn btn-white shadow-lg gap-3 h-fit px-5 py-5 min-w-[200px]"
    >
        <div class="w-full h-full flex-center flex-col gap-3">
            <IconDoorEnter size={100} />
            <div class="text-lg">Join Room</div>
        </div>
    </label>
</div>
