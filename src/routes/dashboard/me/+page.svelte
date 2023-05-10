<script lang="ts">
    import { page } from "$app/stores";
    import { darkMode } from "@/store";
    import fetchUserSettings from "@/utils/fetchUserSettings";
    import setDarkMode from "@/utils/setDarkMode";
    import updateUserSettings from "@/utils/updateUserSettings";
    import type { Settings } from "@prisma/client";
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    const user = $page.data.user;

    let settings: Settings | null | undefined = undefined;

    onMount(() => {
        fetchUserSettings().then((e) => (settings = e));
    });

    async function changeSettings(key: string, value: any) {
        settings = await updateUserSettings(key, value);
    }
</script>

<div class="container flex-col p-4 max-sm:px-2">
    <!-- Profile Card -->
    <div class="card p-4 px-10">
        <div class="font-bold text-lg">Profile</div>
        <hr class="my-4" />
        <div class="flex justify-start gap-10">
            <img
                width="200"
                height="200"
                class="rounded-full"
                src={user.image}
                alt=""
            />
            <div class="flex flex-col gap-3">
                <label class="label">
                    <span>Name</span>
                    <input
                        class="input"
                        value={user.name}
                        type="text"
                        disabled
                        placeholder="Name"
                    />
                </label>
                <label class="label">
                    <span>Email</span>
                    <input
                        class="input"
                        value={user.email}
                        type="text"
                        disabled
                        placeholder="Email"
                    />
                </label>
            </div>
        </div>
    </div>

    <div class="my-4" />

    <!-- Settings Card -->
    <div class="card p-4 px-10">
        <div class="font-bold text-lg">Settings</div>
        <hr class="my-4" />
        {#if settings === null}
            <div class="text-lg font-bold text-red-500">
                Failed to fetch settins
            </div>
        {/if}
        {#if settings === undefined}
            <div class="placeholder" />
        {/if}
        {#if settings}
            <div class="flex flex-col gap-3">
                <!-- Dark Mode -->
                <SlideToggle
                    on:change={async () => darkMode.set(!$darkMode)}
                    name="settings-dark-mode"
                    checked={$darkMode}>Dark Mode</SlideToggle
                >
            </div>
        {/if}
    </div>
</div>
