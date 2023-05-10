<script>
    import SettingsButton from "@/lib/components/SettingsButton.svelte";
    import { AppBar } from "@skeletonlabs/skeleton";
</script>

<AppBar>
    <svelte:fragment slot="lead"
        ><div class="text-xl font-bold">
            <a href="/dashboard">ChatPat</a>
        </div></svelte:fragment
    >

    <a href="/dashboard/explore">Explore</a>

    <svelte:fragment slot="trail">
        <!-- Settings Button -->
        <SettingsButton />
    </svelte:fragment>
</AppBar>
