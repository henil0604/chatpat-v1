<script lang="ts">
    import { page } from "$app/stores";
    import {
        addChat,
        getChat,
        pusherChannel,
        rawChatsStore,
        type chat,
        chatsStore,
    } from "@/store";
    import initPusherChannelForRoom from "@/utils/initPusherChannelForRoom";
    import pusher from "@/utils/pusher";
    import type { Chat, Room, User } from "@prisma/client";
    import { Avatar } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import ChatBlock from "./ChatBlock.svelte";

    let room: Room = $page.data.room;
    let chats: Chat[] = $page.data.chats;
    let user: User = $page.data.user;

    onMount(() => {
        rawChatsStore.set(chats as any);

        initPusherChannelForRoom(room);
    });
</script>

<div id="body" class="grow-1 w-full h-full pt-5 pb-2 overflow-y-scroll">
    {#each $chatsStore as block, index}
        <ChatBlock {block} />
    {/each}
</div>
