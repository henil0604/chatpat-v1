import { addChat, getChat, pusherChannel, type chat, userStore } from "@/store";
import { get } from "svelte/store";
import pusher from "@/utils/pusher";
import type { Room, User } from "@prisma/client";
import { decrypt } from "@/utils/crypto";
import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";
import sendRoomJoinEvent from "@/utils/sendRoomJoinEvent";
import { toastStore } from "@skeletonlabs/skeleton";

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

function joinHandler(data: any) {
    console.log(`New Join event:`, data)
    if (!data.user.name || data.user.id === get(userStore)?.id) return;
    toastStore.trigger({
        message: `${data.user.name} Joined`,
        background: "variant-ghost-primary",
        timeout: 2000,
    })
}

function leaveHandler(data: any) {
    console.log(`New Leave event:`, data)
    if (!data.user.name || data.user.id === get(userStore)?.id) return;
    toastStore.trigger({
        message: `${data.user.name} Left`,
        background: "variant-ghost-error",
        timeout: 2000,
    })
}

export default function initPusherChannelForRoom(room: Room) {
    if (get(pusherChannel)) {
        get(pusherChannel)?.disconnect();
        pusherChannel.set(null);
    }

    const user = get(userStore);

    let channel = pusher.subscribe(`r-${room.name}`);

    channel.bind("new-chat", newChatHandler);
    channel.bind("join", joinHandler);
    channel.bind("leave", leaveHandler);

    // TODO: remove in production
    (window as any).channel = channel;

    sendRoomJoinEvent(room.name)

    pusherChannel.set(channel);
}