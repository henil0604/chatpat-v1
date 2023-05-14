<script lang="ts">
    import type { chat } from "@/store";
    import { onMount } from "svelte";
    import moment from "moment";

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
    class={`card items-end max-w-screen flex py-1 px-3 max-md:px-3 justify-between transition w-fit hover:bg-gray-400 dark:hover:bg-gray-800 ${
        index > 0 ? "pt-0" : ""
    }`}
    data-chat-id={chat.id}
>
    <!-- content -->
    <div class="w-full flex">
        <div
            class="break-words w-full order-first mr-10 max-sm:mr-3 text-base max-md:text-sm"
        >
            {chat.content}
        </div>
        <div
            class="flex font-sans justify-end items-end text-right min-w-fit text-muted text-[11px] italic order-last"
        >
            {new Date(chat.createdAt).toLocaleTimeString(undefined, {
                timeStyle: "short",
            })}{chat.atClient ? "(Sending...)" : ""}
        </div>
    </div>
</div>
