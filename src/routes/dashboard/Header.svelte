<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import User from "@/lib/components/User.svelte";
    import WalletCard from "@/lib/components/WalletCard.svelte";
    import { userStore } from "@/store";
    import Icon from "@iconify/svelte";
    import { AppBar, drawerStore, modalStore } from "@skeletonlabs/skeleton";

    function handleJoinButton() {
        modalStore.trigger({
            type: "prompt",
            title: "Join Room",
            value: "",
            position: "items-start",
            backdropClasses: "dark text-white",
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

    function handleDrawerOpen() {
        drawerStore.open({
            id: "appDrawer",
            bgDrawer: "",
            width: "w-[500px] max-md:w-full",
            rounded: "rounded-sm",
        });
    }

    userStore.subscribe((u) => {
        console.log(u);
    });
</script>

<AppBar>
    <svelte:fragment slot="lead"
        ><div class="text-2xl font-bold">
            <a href="/dashboard">ChatPat</a>
        </div></svelte:fragment
    >

    <svelte:fragment slot="trail">
        <button
            on:click={handleJoinButton}
            class="btn btn-sm variant-filled-secondary">Join</button
        >
        <!-- Wallet Card -->
        <WalletCard />
        <button
            on:click={handleDrawerOpen}
            class="px-3 btn variant-filled-secondary"
            ><Icon icon="material-symbols:menu" /></button
        >
    </svelte:fragment>
</AppBar>
