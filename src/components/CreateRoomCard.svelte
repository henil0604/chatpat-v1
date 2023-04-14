<script lang="ts">
    import { goto } from "$app/navigation";

    // @ts-nocheck

    import { page } from "$app/stores";
    import { loading, loadingMessage } from "@/store";
    import sleep from "@/utils/sleep";
    import { IconPlus } from "@tabler/icons-svelte";
    import { toasts } from "svelte-toasts";

    $: user = $page.data.user;

    let data = {
        roomName: "",
        visibility: "unlisted",
        password: "",
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        console.log(event);

        loading.set(true);
        loadingMessage.set("Creating Room");

        try {
            const response = await fetch("/api/create-room", {
                method: "post",
                body: JSON.stringify({
                    ...data,
                }),
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
                description: "Room Created, redirecting...",
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
    <input type="checkbox" id="create-room-modal" class="modal-toggle" />
    <label for="create-room-modal" class="modal text-black cursor-pointer">
        <div class="modal-box relative min-w-fit cursor-default">
            <label
                for="create-room-modal"
                class="btn btn-sm btn-circle absolute right-4 top-4">✕</label
            >
            <h3 class="font-bold text-lg">Create Room</h3>
            <hr class="my-4" />
            <form on:submit={handleSubmit}>
                <!-- Room Name -->
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Room Name</span>
                    </label>
                    <!-- <label class="input-group"> -->
                    <input
                        type="text"
                        placeholder="my-room"
                        class="input input-bordered w-full"
                        required
                        bind:value={data.roomName}
                    />
                    <!-- TODO: feat: random room name -->
                    <!-- <div class="tooltip" data-tip="Random">
                            <button
                                role="button"
                                class="btn rounded-l-none btn-primary"
                                ><IconDice /></button
                            >
                        </div> -->
                    <!-- </label> -->
                </div>

                <div class="my-2" />

                <!-- Visibility -->
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Visibility</span>
                    </label>
                    <select
                        bind:value={data.visibility}
                        required
                        class="select select-bordered"
                    >
                        <option value="public" selected>Public</option>
                        <option value="unlisted">Unlisted</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {#if data.visibility === "private"}
                    <div class="my-2" />
                    <!-- Password -->
                    <div class="form-control">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <!-- <label class="input-group"> -->
                        <input
                            type="password"
                            placeholder="secret"
                            class="input input-bordered w-full"
                            required
                            bind:value={data.password}
                        />
                    </div>
                {/if}

                <div class="my-4" />

                <button type="submit" class="btn">Create</button>
            </form>
        </div>
    </label>

    <label
        for="create-room-modal"
        class="btn btn-white shadow-lg gap-3 h-fit px-5 py-5 min-w-[200px]"
    >
        <div class="w-full h-full flex-center flex-col gap-3">
            <IconPlus size={100} />
            <div class="text-lg">Create Room</div>
        </div>
    </label>
</div>
