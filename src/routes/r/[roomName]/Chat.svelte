<script lang="ts">
    import type { chat } from "@/store";
    import { onMount } from "svelte";

    export let chat: chat;
    export let index: number;

    let div: HTMLDivElement;

    function isUserAtEndOfContainer(selector: string, threshold = 10): boolean {
        const container = document.querySelector(selector);

        if (!container) {
            return false;
        }

        const scrollThreshold = 40;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        return scrollHeight - scrollTop <= clientHeight + scrollThreshold;
    }

    onMount(() => {
        div?.scrollIntoView();
    });
</script>

<div
    bind:this={div}
    class={`chat items-end flex py-1 px-3 max-md:px-2 justify-between transition w-full hover:bg-gray-200 dark:hover:bg-gray-800 ${
        index > 0 ? "pt-0" : ""
    }`}
    data-chat-id={chat.id}
>
    <div class="break-words order-first mr-10 text-base max-md:text-sm">
        {chat.content}
    </div>
    <div
        class="chat-time text-muted text-xs italic hidden order-last tracking-tighter"
    >
        {new Date(chat.createdAt).toLocaleTimeString()}
        {chat.atClient ? "(Sending...)" : ""}
    </div>
</div>

<style scoped>
    .chat:hover .chat-time {
        display: block;
    }
</style>
