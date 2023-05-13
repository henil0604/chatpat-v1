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

<div class="flex flex-col w-full h-fit my-2 transition-all">
    <div id="label" class="text-center italic text-sm text-muted">
        {block.label}
    </div>
    <div class="mt-2">
        {#each block.sections as section}
            <div
                class={`w-full h-fit py-1 px-6 rounded-sm transition max-sm:px-3 flex gap-2 my-3`}
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
                    class={`card rounded-md overflow-hidden w-fit min-w-[300px] max-md:min-w-[300px] max-sm:w-full text-[14px]`}
                >
                    <div class={`w-fit px-2 py-2`}>
                        {section.owner.name}
                    </div>
                    <div
                        id="chats"
                        class="flex bg-surface-200 dark:bg-surface-700 flex-col"
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
