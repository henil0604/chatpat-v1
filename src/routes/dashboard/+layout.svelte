<script>
    import { AppShell } from "@skeletonlabs/skeleton";
    import Header from "@/routes/dashboard/Header.svelte";
</script>

<AppShell>
    <svelte:fragment slot="header"><Header /></svelte:fragment>
    <slot />
</AppShell>
