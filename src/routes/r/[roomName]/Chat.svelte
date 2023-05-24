<script lang="ts">
    import { userStore, type chat } from "@/store";
    import { onMount } from "svelte";
    import moment from "moment";
    import Icon from "@iconify/svelte";
    import { fly } from "svelte/transition";

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
    in:fly={{ x: chat.owner.id === $userStore?.id ? -50 : 50 }}
    bind:this={div}
    class={`card items-end max-w-screen flex py-1.5 pr-1.5 px-3 max-md:pr-1 justify-between transition w-fit ${
        chat.owner.id === $userStore?.id
            ? "bg-teal-700 text-white dark:bg-tertiary-800"
            : "variant-ghost dark:bg-cyan-950"
    }`}
    data-chat-id={chat.id}
>
    <!-- content -->
    <div class="w-full flex">
        <div
            class="break-words w-full order-first mr-4 flex flex-col max-sm:mr-3 max-md:text-sm"
        >
            {#if index === 0 && chat.owner.id !== $userStore?.id}
                <div
                    class="text-[14px] font-semibold text-primary-800 dark:text-primary-600"
                >
                    @{chat.owner.username}
                </div>
            {/if}
            <div class="text-sm dark:text-white">
                {chat.content}
            </div>
        </div>
        <div
            class="flex mt-1 gap-1 font-sans justify-end items-end text-right min-w-fit text-[11px] order-last"
        >
            <div>
                {new Date(chat.createdAt).toLocaleTimeString(undefined, {
                    timeStyle: "short",
                })}
            </div>
            <div>
                {#if chat.atClient && !chat.failed}
                    <Icon icon="material-symbols:timer-outline" />
                {/if}
                {#if chat.failed}
                    <Icon color="red" icon="zondicons:exclamation-solid" />
                {/if}
            </div>
        </div>
    </div>
</div>
