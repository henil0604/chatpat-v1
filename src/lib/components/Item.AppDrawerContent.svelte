<script lang="ts">
    import { page } from "$app/stores";
    import Icon from "@iconify/svelte";
    import { drawerStore } from "@skeletonlabs/skeleton";

    export let href: string;
    export let title: string;
    export let icon: string;

    function handleClick() {
        drawerStore.close();
    }
</script>

<a
    {href}
    on:click={handleClick}
    class="card flex items-center gap-2 p-2 w-full hover:variant-ghost-primary cursor-pointer"
    class:active={$page.url.pathname === href}
>
    <Icon {icon} class="text-xl" />
    {title}
</a>

<style lang="postcss">
    .active {
        @apply bg-primary-500;
    }
</style>
