<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";
    import { addChat, getChat, sendingChat, updateChat } from "@/store";
    import { encrypt } from "@/utils/crypto";
    import randomString from "@/utils/randomString";
    import sendMessage from "@/utils/sendMessage";
    import Icon from "@iconify/svelte";
    import type { Room, User } from "@prisma/client";
    import { onMount } from "svelte";

    let room: Room = $page.data.room;
    let user: User = $page.data.user;

    let messageValue = "";

    async function handleSend() {
        let messageContent = messageValue;
        if (messageContent.trim() === "") {
            return;
        }
        messageValue = "";

        let data = {
            id: randomString(21),
            message: messageContent,
            createdAt: Date.now(),
        };

        addChat({
            id: data.id,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.createdAt),
            owner: user,
            ownerId: user.id,
            room: room,
            roomId: room.id,
            content: messageContent,
            atClient: true,
        });

        await sendMessage(room?.name as string, {
            id: data.id,
            message: encrypt(data.message, PUBLIC_TRANSPORT_SECRET),
        });

        return true;
    }
</script>

<div class="flex p-3 gap-2 variant-ghost-secondary">
    <label class="label w-full">
        <input
            bind:value={messageValue}
            on:keyup={(e) => {
                e.keyCode === 13 && handleSend();
            }}
            class={`input w-full 
            ${
                messageValue.length > 50 &&
                messageValue.length < 100 &&
                "text-yellow-500"
            }
            ${
                messageValue.length > 100 &&
                messageValue.length < 200 &&
                "text-orange-500"
            } 
            ${messageValue.length > 200 && "text-red-500"}`}
            type="text"
            placeholder="Type your message..."
        />
    </label>
    <button on:click={handleSend} class="btn variant-ghost-primary px-3">
        <Icon icon="mdi:send" />
    </button>
</div>
