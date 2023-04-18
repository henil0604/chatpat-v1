<script lang="ts">
    import { page } from "$app/stores";
    import { addChat, chatsStore, updateChat } from "@/store";
    import { encrypt } from "@/utils/crypto";
    import randomString from "@/utils/randomString";
    import { IconSend } from "@tabler/icons-svelte";

    const roomName = $page.params.roomName;
    const room = $page.data.room;
    const user = $page.data.user;

    $: message = "";

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
            scroll: true
        });

        try {
            const response = await fetch(`/api/r/${roomName}/send-message`, {
                method: "post",
                body: JSON.stringify(data),
            });
            updateChat(data.id, { atClient: false });
        } catch (e) {}

        return true;
    }
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
