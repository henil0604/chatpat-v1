<script lang="ts">
    import type { chat } from "@/store";
    import { onMount } from "svelte";

    export let chat: chat;
    export let index: number;

    let div: HTMLDivElement;

    onMount(() => {
        if (chat.scroll) {
            div.scrollIntoView();
        }
    });
</script>

<div
    bind:this={div}
    class={`chat items-end flex py-1 px-1 justify-between rounded transition w-full hover:bg-gray-100 ${
        index > 0 ? "pt-0" : ""
    }`}
>
    <p id="content order-first">
        {chat.content}
    </p>
    <div class="chat-time text-gray-600 text-xs italic hidden order-last">
        {new Date(chat.createdAt).toLocaleTimeString()}
        {chat.atClient ? "(Sending...)" : ""}
    </div>
</div>

<style scoped>
    .chat:hover .chat-time {
        display: block;
    }
</style>
