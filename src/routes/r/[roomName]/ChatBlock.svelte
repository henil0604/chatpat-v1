<script lang="ts">
    import type { block } from "@/utils/transformChats";
    import Chat from "./Chat.svelte";
    import type { User } from "@prisma/client";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { rawChatsStore } from "@/store";

    let user: User = $page.data.user;
    export let block: block;

    onMount(() => {
        const lastChat = $rawChatsStore.at(-1);
        if (lastChat) {
            const chatDiv = document.querySelector(
                `[data-chat-id='${lastChat.id}']`
            );

            chatDiv?.scrollIntoView();
        }
    });
</script>

<div class="flex flex-col w-full h-fit my-2 transition-all overflow-x-hidden">
    <div id="label" class="text-center italic text-sm text-muted">
        {block.label}
    </div>
    <div class="mt-2">
        {#each block.sections as section}
            <div
                class="w-full h-fit py-1 px-6 max-md:px-5 max-sm:px-4 rounded-sm transition flex gap-2 my-3 max-md:my-1 max-md:gap-1 {section
                    .owner.id === user.id
                    ? 'flex-row-reverse'
                    : ''}"
            >
                <div
                    class="flex flex-col rounded-md border-primary-500 overflow-hidden w-fit min-w-[300px] max-w-[80%] max-sm:max-w-[90%] max-sm:min-w-fit max-sm:max-w-fit text-[14px] {section
                        .owner.id === user.id
                        ? 'items-end'
                        : 'items-start'}"
                >
                    {#if section.owner.id !== user.id}
                        <div
                            class="w-fit rounded p-2 flex text-xs font-thin gap-2 max-md:py-1 text-primary-900 variant-soft-primary items-start"
                        >
                            {section.owner.name}
                        </div>
                    {/if}
                    <div
                        id="chats"
                        class="flex flex-col w-full gap-1 mt-1 {section.owner
                            .id !== user.id
                            ? 'items-start'
                            : 'items-end'}"
                    >
                        {#each section.chats as chat, index}
                            <!-- CHAT -->
                            <Chat {chat} {index} />
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
