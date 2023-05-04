<script lang="ts">
    import { page } from "$app/stores";
    import {
        addChat,
        chatsStore,
        pusherChannel,
        rawChatsStore,
        type chat,
        getChat,
    } from "@/store";
    import ChatBlock from "@/components/ChatBlock.svelte";
    import { get } from "svelte/store";
    import pusher from "@/utils/pusher";
    import { onDestroy, onMount } from "svelte";

    const roomName = $page.params.roomName;
    const room = $page.data.room;
    const user = $page.data.user;

    let bodyDiv: HTMLDivElement | null = null;

    chatsStore.subscribe((chats) => {
        // console.log("chats:", chats);
    });
    rawChatsStore.subscribe((chats) => {
        // console.log("raw:", chats);
    });

    // Channel
    onMount(() => {
        if ($pusherChannel) {
            return;
        }

        var channel = pusher.subscribe(`${roomName}`);
        channel.bind("new-chat", async (data: any) => {
            // console.log("data?", data);
            if (!data.id) {
                console.error(data);
                return;
            }

            const chat: chat = data;

            console.log(
                chat.id,
                Date.now() - new Date(chat.createdAt).getTime()
            );

            if (getChat(chat.id).chat) {
                return;
            }

            addChat({
                ...chat,
                scroll: true,
            });
        });

        pusherChannel.set(channel);
    });

    (window as any).pusher = pusher;
</script>

<div
    bind:this={bodyDiv}
    id="body"
    class="grow-1 w-full h-full pt-5 pb-2 overflow-y-scroll"
>
    {#each $chatsStore as block, index}
        <ChatBlock {block} {index} />
    {/each}
</div>
