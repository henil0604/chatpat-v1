<script lang="ts">
    import { page } from "$app/stores";
    import Body from "@/components/Body.Room.svelte";
    import Footer from "@/components/Footer.Room.svelte";
    import Header from "@/components/Header.Room.svelte";

    $: roomName = $page.params.roomName;
    $: user = $page.data.user;
</script>

<div class="w-full min-h-screen bg-brand">
    <main
        class="w-full h-screen bg-brand flex items-center flex-col text-white transition p-4 max-sm:p-0"
    >
        <div
            class="bg-white text-black w-full rounded shadow-lg flex flex-col h-full max-sm:rounded-none"
        >
            <Header />
            <Body />
            <Footer />
        </div>
    </main>
</div>
