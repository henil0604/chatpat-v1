<script lang="ts">
    import { page } from "$app/stores";
    import Body from "@/components/Body.Room.svelte";
    import Footer from "@/components/Footer.Room.svelte";
    import Header from "@/components/Header.Room.svelte";
    import {
        chatsStore,
        pusherChannel,
        rawChatsStore,
        roomStore,
    } from "@/store";
    import { onDestroy, onMount } from "svelte";

    const roomName = $page.params.roomName;
    const room = $page.data.room;
    const user = $page.data.user;

    onMount(() => {
        room.Chat[room.Chat.length - 1] = {
            ...room.Chat[room.Chat.length - 1],
            scroll: true,
        };
        roomStore.set(room);
        rawChatsStore.set(room.Chat);
        // Quick hack for scroll to end
        setTimeout(() => {
            rawChatsStore.set([...room.Chat, { owner: {} }]);
            rawChatsStore.set([...room.Chat]);
        }, 10);
    });

    onDestroy(() => {
        roomStore.set(null);
        rawChatsStore.set([]);
        pusherChannel.set(null);
    });
</script>

<div class="w-full min-h-screen bg-brand">
    <main
        class="w-full h-screen bg-brand flex-center flex-col text-white transition p-4 max-sm:p-0"
    >
        {#if !room}
            <div
                class="bg-white text-black rounded shadow-lg flex-center flex-col max-sm:rounded-none p-5"
            >
                Room Not Found
            </div>
        {:else}
            <div
                class="bg-white text-black w-full rounded shadow-lg flex flex-col overflow-y-hidden max-sm:rounded-none min-h-full"
            >
                <Header />
                <Body />
                <Footer />
            </div>
        {/if}
    </main>
</div>
