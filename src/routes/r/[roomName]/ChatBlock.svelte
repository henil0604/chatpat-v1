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
                <div id="avatar" class={`min-w-[40px]`}>
                    <div class="avatar">
                        <div class="w-[35px]">
                            <img
                                class="rounded-full"
                                src={section.owner.image}
                                alt="Failed!"
                            />
                        </div>
                    </div>
                </div>
                <div
                    id="content"
                    class="card rounded-md border-primary-500 overflow-hidden w-fit min-w-[300px] max-w-[80%] max-sm:max-w-none [100px]:bg-green-500 max-sm:min-w-none max-sm:w-full text-[14px]"
                >
                    <div class={`w-full p-2 max-md:py-1 variant-ghost-primary`}>
                        {section.owner.name}
                    </div>
                    <div id="chats" class="flex flex-col">
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
