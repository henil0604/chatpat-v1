<script lang="ts">
    import { chatsStore, type chat } from "@/store";
    import type { block } from "@/utils/transformChats";
    import type { Chat, Room, User } from "@prisma/client";

    export let block: block;
    export let index: number;
</script>

<div class="flex flex-col w-full h-fit my-2">
    <div id="label" class="text-center italic text-sm text-gray-600">
        {block.label}
    </div>
    <div class="mt-2">
        {#each block.sections as section}
            <div
                class={`w-full h-fit py-1 px-6 rounded-sm transition max-sm:px-3 flex gap-2 my-3`}
            >
                <div id="avatar" class={`min-w-[40px]`}>
                    <div
                        class="tooltip tooltip-right"
                        data-tip={section.owner.name}
                    >
                        <div class="avatar">
                            <div class="w-[35px] rounded-full">
                                <img src={section.owner.image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="content" class={`w-full text-[14px]`}>
                    {#each section.chats as chat, index}
                        <!-- CHAT -->
                        {@const atClient = chat.atClient}
                        <div
                            class={`chat items-end flex py-1 px-1 justify-between rounded transition w-full hover:bg-gray-100 ${
                                atClient ? "text-gray-400" : ""
                            } ${index > 0 ? "pt-0" : ""}`}
                        >
                            <p id="content order-first">
                                {chat.content}
                            </p>
                            <div
                                class="chat-time text-gray-600 text-xs italic hidden order-last"
                            >
                                {new Date(chat.createdAt).toLocaleTimeString()}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style scoped>
    .chat:hover .chat-time {
        display: block;
    }
</style>
