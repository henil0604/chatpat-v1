<script>
    import { page } from "$app/stores";
    import AccountCard from "@/components/AccountCard.svelte";
    import CreateRoomCard from "@/components/CreateRoomCard.svelte";

    $: user = $page.data.user;
</script>

<div class="w-full min-h-screen bg-brand">
    <main
        class="w-full h-screen bg-brand flex items-center flex-col text-white transition-all py-32"
    >
        <!-- ACCOUNT  -->
        <AccountCard />
        <div class="my-5" />

        <div class="flex">
            <CreateRoomCard />
        </div>
    </main>
</div>
