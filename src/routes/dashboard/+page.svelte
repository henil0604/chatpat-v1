<script>
    import { page } from "$app/stores";
    import AccountCard from "@/components/AccountCard.svelte";

    $: user = $page.data.user;
</script>

<div class="w-full min-h-screen bg-brand">
    <main
        class="w-full h-screen bg-brand flex-center flex-col text-white transition-all"
    >
        <!-- ACCOUNT  -->
        <AccountCard />
    </main>
</div>
