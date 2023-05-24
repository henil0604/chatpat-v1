<script lang="ts">
    import { page } from "$app/stores";
    import {
        addChat,
        getChat,
        pusherChannel,
        rawChatsStore,
        type chat,
        chatsStore,
        roomSpentTimeInSeconds,
    } from "@/store";
    import initPusherChannelForRoom from "@/utils/initPusherChannelForRoom";
    import pusher from "@/utils/pusher";
    import type { Chat, Room, User } from "@prisma/client";
    import { Avatar } from "@skeletonlabs/skeleton";
    import { onDestroy, onMount, tick } from "svelte";
    import ChatBlock from "./ChatBlock.svelte";
    import { APP_NAME } from "@/const";
    import { fly } from "svelte/transition";
    import reportRoomPresence from "@/utils/reportRoomPresence";
    import { isInactive } from "@/stores/activity";

    let room: Room = $page.data.room;
    let chats: Chat[] = $page.data.chats;
    let user: App.Session["user"] = $page.data.user;

    let spendingInterval: any;

    onMount(() => {
        rawChatsStore.set(chats as any);

        initPusherChannelForRoom(room);

        spendingInterval = setInterval(() => {
            if (!document.hidden && !isInactive()) {
                roomSpentTimeInSeconds.update((s) => s + 1);
                console.log("$roomSpentTimeInSeconds", $roomSpentTimeInSeconds);

                if ($roomSpentTimeInSeconds % 60 === 0) {
                    reportRoomPresence(room.name);
                }
            }
        }, 1000);
    });

    onDestroy(() => {
        roomSpentTimeInSeconds.set(0);
        clearInterval(spendingInterval);
    });
</script>

<svelte:head>
    <title>{room.name} - {APP_NAME}</title>
</svelte:head>

<div
    transition:fly={{ y: -200 }}
    id="body"
    class="grow-1 w-full h-full pt-5 pb-2 overflow-y-scroll"
>
    {#each $chatsStore as block, index}
        <ChatBlock {block} />
    {/each}
</div>
