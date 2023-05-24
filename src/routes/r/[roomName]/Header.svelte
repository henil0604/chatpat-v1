<script lang="ts">
    import { page } from "$app/stores";
    import WalletCard from "@/lib/components/WalletCard.svelte";
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

    {#if $page.data?.room?.name}
        <div
            class="text-xl max-md:text-lg max-sm:text-base font-bold flex-center w-fit"
        >
            {$page.data.room.name}
        </div>
    {:else}
        <div class="placeholder animate-pulse w-[100px]" />
    {/if}

    <svelte:fragment slot="trail">
        <WalletCard />
    </svelte:fragment>
</AppBar>
