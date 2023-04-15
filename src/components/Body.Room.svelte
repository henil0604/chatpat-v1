<script lang="ts">
    import { page } from "$app/stores";
    import { chatsStore, rawChatsStore } from "@/store";
    import ChatBlock from "@/components/ChatBlock.svelte";
    import { get } from "svelte/store";

    $: roomName = $page.params.roomName;
    $: room = $page.data.room;
    $: user = $page.data.user;

    let bodyDiv: HTMLDivElement | null = null;

    chatsStore.subscribe((chats) => {
        console.log("chats:", chats);
        if (bodyDiv) {
            bodyDiv.scrollTop = bodyDiv.scrollHeight;
        }
    });
    rawChatsStore.subscribe((chats) => {
        console.log("raw:", chats);
        if (bodyDiv) {
            bodyDiv.scrollTop = bodyDiv.scrollHeight;
        }
    });
</script>

<div
    bind:this={bodyDiv}
    id="body"
    class="grow-1 w-full h-full pt-5 pb-2 overflow-y-scroll scroll-smooth"
>
    {#each $chatsStore as block, index}
        <ChatBlock {block} {index} />
    {/each}
</div>
