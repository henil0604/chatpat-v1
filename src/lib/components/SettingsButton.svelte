<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import Icon from "@iconify/svelte";
    import { ListBox, ListBoxItem, popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";

    let popupSettings: PopupSettings = {
        event: "click",
        target: "settingsPopup",
        closeQuery: "",
    };

    function handleLogout() {
        signOut();
    }
</script>

<div
    class="card variant-filled-secondary min-w-[200px] p-4 flex flex-col items-start hidden"
    data-popup="settingsPopup"
>
    <h6>Settings</h6>
    <div class="mt-2" />
    <div class="flex-center flex-col gap-1">
        <a
            class="btn btn-sm variant-ghost w-full flex-center gap-2"
            href="/dashboard/me"
        >
            <Icon icon="mdi:user" class="text-white text-xl" />
            Profile
        </a>
        <button
            class="btn btn-sm variant-ghost w-full flex-center gap-2"
            on:click={handleLogout}
        >
            <Icon icon="solar:logout-2-bold" class="text-rose-500 text-xl" />
            Logout
        </button>
    </div>
</div>

<button class="btn p-0" use:popup={popupSettings}>
    <Icon class="text-2xl" icon="mdi:gear" />
</button>
