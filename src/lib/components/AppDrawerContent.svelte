<script>
    import { APP_NAME } from "@/const";
    import AppDrawerContentItem from "@/lib/components/Item.AppDrawerContent.svelte";
    import { signOut } from "@auth/sveltekit/client";
    import Icon from "@iconify/svelte";
    import { drawerStore } from "@skeletonlabs/skeleton";
</script>

<div class="w-full flex flex-col gap-2 p-4">
    <div class="flex justify-between">
        <div class="text-3xl font-semibold">{APP_NAME}</div>
        <button on:click={drawerStore.close} class="btn variant-ghost px-2"
            ><Icon class="text-xl" icon="mdi:close" /></button
        >
    </div>

    <div class="my-1" />
    <!-- items -->
    <AppDrawerContentItem
        icon="material-symbols:dashboard"
        href="/dashboard"
        title="Dashboard"
    />
    <AppDrawerContentItem
        icon="material-symbols:explore"
        href="/dashboard/explore"
        title="Explore"
    />
    <AppDrawerContentItem
        icon="mdi:plus"
        href="/dashboard/create"
        title="Create Room"
    />
    <AppDrawerContentItem
        icon="mdi:user"
        href="/dashboard/me"
        title="Profile"
    />

    <button
        class="card variant-ghost-error hover:variant-filled-error flex items-center gap-2 p-2 w-full cursor-pointer"
        on:click={() => signOut()}
    >
        <Icon icon="solar:logout-2-bold" class="text-xl" />
        Logout
    </button>
</div>
