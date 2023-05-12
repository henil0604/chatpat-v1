<script lang="ts">
    import { page } from "$app/stores";
    import {
        addChat,
        getChat,
        pusherChannel,
        rawChatsStore,
        type chat,
    } from "@/store";
    import initPusherChannelForRoom from "@/utils/initPusherChannelForRoom";
    import pusher from "@/utils/pusher";
    import type { Chat, Room } from "@prisma/client";
    import { onMount } from "svelte";

    let room: Room = $page.data.room;
    let chats: Chat[] = $page.data.chats;

    onMount(() => {
        rawChatsStore.set(chats as any);

        initPusherChannelForRoom(room);
    });
</script>

<div class="h-full w-full flex flex-col">
    {#each $rawChatsStore as chat}
        <div>
            {chat.content}
        </div>
    {/each}
</div>
