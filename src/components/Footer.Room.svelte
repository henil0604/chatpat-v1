<script lang="ts">
    import { page } from "$app/stores";
    import {
        addChat,
        chatsStore,
        chatQueue,
        sendingChat,
        updateChat,
        getChat,
    } from "@/store";
    import { encrypt } from "@/utils/crypto";
    import randomString from "@/utils/randomString";
    import { IconSend } from "@tabler/icons-svelte";
    import { onMount } from "svelte";

    const roomName = $page.params.roomName;
    const room = $page.data.room;
    const user = $page.data.user;

    $: message = "";

    setInterval(async () => {
        const queue = $chatQueue;
        if (!$sendingChat && queue.length > 0) {
            const chatId = queue[0];
            const chat = getChat(chatId).chat;

            if (!chat) {
                return;
            }

            console.log(`sending fom queue`, chat);
            await send({
                id: chat.id,
                message: chat.content,
                createdAt: Date.now(),
            });

            queue.shift();

            chatQueue.set(queue);
        }
    }, 100);

    async function send(data: any) {
        sendingChat.set(true);
        const response = await fetch(`/api/r/${roomName}/send-message`, {
            method: "post",
            body: JSON.stringify(data),
        });
        sendingChat.set(false);
        updateChat(data.id, { atClient: false });
    }

    async function handleSend() {
        if (message === "" || message.trim() === "") return false;
        const msg = message;
        message = "";

        let data = {
            id: randomString(21),
            message: msg,
            createdAt: Date.now(),
        };

        addChat({
            id: data.id,
            createdAt: new Date(data.createdAt),
            owner: user,
            ownerId: user.id,
            room: room,
            roomId: room.id,
            content: msg,
            atClient: true,
            type: "message",
            scroll: true,
        });

        if ($sendingChat || $chatQueue.length > 0) {
            console.log(`queued`, data.id);
            chatQueue.update((queue) => {
                queue.push(data.id);
                return queue;
            });
            return;
        }

        try {
            await send(data);
        } catch (e) {}

        return true;
    }

    onMount(() => {});
</script>

<div id="footer" class="flex border-t">
    <input
        type="text"
        class="input rounded-none input-bordered w-full"
        placeholder="Type..."
        bind:value={message}
        on:keydown={(e) => {
            if (e.keyCode === 13) handleSend();
        }}
    />
    <button class="btn rounded-none" on:click={handleSend}>
        <IconSend />
    </button>
</div>
