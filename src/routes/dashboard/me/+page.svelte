<script lang="ts">
    import { page } from "$app/stores";
    import { APP_NAME } from "@/const";
    import { darkMode, loading } from "@/store";
    import fetchUserSettings from "@/utils/fetchUserSettings";
    import setDarkMode from "@/utils/setDarkMode";
    import updateUserSettings from "@/utils/updateUserSettings";
    import type { Settings, User } from "@prisma/client";
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    const user: User = $page.data.user;

    let settings: Settings | null | undefined = undefined;

    onMount(async () => {
        settings = await fetchUserSettings();
        loading.set(false);
    });

    async function changeSettings(key: string, value: any) {
        settings = await updateUserSettings(key, value);
    }
</script>

<svelte:head>
    <title>{APP_NAME} - {user.name}</title>
</svelte:head>

<div class="container flex-col p-4 max-sm:px-2">
    <!-- Profile Card -->
    <div class="card p-4 px-10 max-md:px-5">
        <div class="font-bold text-lg">Profile</div>
        <hr class="my-4" />
        <div
            class="flex justify-start gap-10 max-md:flex-col max-md:items-center"
        >
            <img
                width="200"
                height="200"
                class="rounded-full"
                src={user.image}
                alt=""
            />
            <div class="flex flex-col gap-3 max-md:w-full">
                <label class="label w-full">
                    <span>Username</span>
                    <input
                        class="input w-full"
                        value={user.username}
                        type="text"
                        disabled
                        placeholder="Name"
                    />
                </label>
                <label class="label w-full">
                    <span>Name</span>
                    <input
                        class="input w-full"
                        value={user.name}
                        type="text"
                        disabled
                        placeholder="Name"
                    />
                </label>
                <label class="label w-full">
                    <span>Email</span>
                    <input
                        class="input w-full"
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
    <div class="card p-4 px-10 max-md:px-5">
        <div class="font-bold text-lg">Settings</div>
        <hr class="my-4" />
        <div class="flex flex-col gap-3">
            <!-- Dark Mode -->
            <SlideToggle
                on:change={async () => darkMode.set(!$darkMode)}
                name="settings-dark-mode"
                checked={$darkMode}>Dark Mode</SlideToggle
            >
            {#if settings === null}
                <div class="text-lg font-bold text-red-500">
                    Failed to fetch settins
                </div>
            {/if}
            {#if settings === undefined}
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
            {/if}
            {#if settings}{/if}
        </div>
    </div>
</div>
