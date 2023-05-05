<script lang="ts">
    import type { block } from "@/utils/transformChats";
    import ChatComponent from "@/components/Chat.ChatBlock.svelte";

    export let block: block;
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
                        <ChatComponent {chat} {index} />
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
