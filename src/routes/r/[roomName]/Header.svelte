<script lang="ts">
    import { page } from "$app/stores";
    import Icon from "@iconify/svelte";
    import { AppBar, popup, type PopupSettings } from "@skeletonlabs/skeleton";

    let goToDashboardPopupSettings: PopupSettings = {
        event: "hover",
        target: "goToDashboardPopup",
    };
</script>

<div
    class="card p-1 px-3 variant-filled-secondary"
    data-popup="goToDashboardPopup"
>
    <p>Go to Dashboard</p>
</div>

<AppBar>
    <svelte:fragment slot="lead">
        <a
            use:popup={goToDashboardPopupSettings}
            href="/dashboard"
            class="btn variant-ghost px-3 [&>*]:pointer-events-none max-md:btn-sm"
        >
            <Icon icon="mdi:arrow-left" />
        </a>
    </svelte:fragment>

    <div
        class="text-xl max-md:text-lg max-sm:text-base font-bold flex-center w-fit"
    >
        <div>{$page.data.room.name}</div>
    </div>

    <svelte:fragment slot="trail" />
</AppBar>
