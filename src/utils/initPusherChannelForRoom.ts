import { addChat, getChat, pusherChannel, type chat } from "@/store";
import { get } from "svelte/store";
import pusher from "@/utils/pusher";
import type { Room } from "@prisma/client";
import { decrypt } from "./crypto";
import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";

function newChatHandler(data: any) {
    // console.log("data?", data);
    if (!data.id) {
        console.error(data);
        return;
    }

    const chat: chat = data;

    console.log(
        chat.id,
        Date.now() - new Date(chat.createdAt).getTime()
    );

    if (getChat(chat.id).chat) {
        return;
    }

    chat.content = decrypt(chat.content, PUBLIC_TRANSPORT_SECRET)

    addChat({
        ...chat,
    });
}

export default function initPusherChannelForRoom(room: Room) {
    if (get(pusherChannel)) {
        get(pusherChannel)?.disconnect();
        pusherChannel.set(null);
    }

    let channel = pusher.subscribe(`r-${room.name}`);

    channel.bind("new-chat", newChatHandler);

    pusherChannel.set(channel);
}