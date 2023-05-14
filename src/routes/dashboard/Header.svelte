<script lang="ts">
    import { goto } from "$app/navigation";
    import SettingsButton from "@/lib/components/SettingsButton.svelte";
    import { AppBar, modalStore } from "@skeletonlabs/skeleton";

    function handleJoinButton() {
        modalStore.trigger({
            type: "prompt",
            title: "Join Room",
            value: "",
            valueAttr: {
                required: true,
                placeholder: "general",
                autocomplete: "off",
            },
            response: (value: string) => {
                if (!value) return;
                goto(`/r/${value}`);
            },
            buttonTextSubmit: "Join",
        });
    }
</script>

<AppBar>
    <svelte:fragment slot="lead"
        ><div class="text-xl font-bold">
            <a href="/dashboard">ChatPat</a>
        </div></svelte:fragment
    >

    <a href="/dashboard/explore">Explore</a>

    <svelte:fragment slot="trail">
        <button
            on:click={handleJoinButton}
            class="btn btn-sm variant-filled-secondary">Join</button
        >
        <!-- Settings Button -->
        <SettingsButton />
    </svelte:fragment>
</AppBar>
