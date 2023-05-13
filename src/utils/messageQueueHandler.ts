import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";
import { getChat, chatQueue, roomStore } from "@/store";
import { encrypt } from "@/utils/crypto";
import sendMessage from "@/utils/sendMessage";
import { get } from "svelte/store";

export default async function messageQueueHandler(queue: string[]) {
    const chatId = queue[0];
    const chat = getChat(chatId).chat;

    if (!chat) {
        return;
    }

    console.log(`sending fom queue`, chat);
    await sendMessage(get(roomStore)?.name as string, {
        id: chat.id,
        message: encrypt(chat.content, PUBLIC_TRANSPORT_SECRET),
        createdAt: Date.now(),
    });

    queue.shift();

    chatQueue.set(queue);
}