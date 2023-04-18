import type { Chat, Room, User } from '@prisma/client';
import { writable, get } from 'svelte/store';
import transformChats, { type block } from '@/utils/transformChats';
import type { Channel } from 'pusher-js';

export const loading = writable<boolean>(false);
export const loadingMessage = writable<string>("");

export const roomStore = writable<Room | null>(null)

export type chat = Chat & { room: Room, owner: User, atClient?: boolean, scroll?: boolean };

export const chatsStore = writable<block[]>([]);
export const rawChatsStore = writable<chat[]>([]);

rawChatsStore.subscribe((chats) => {
    const transformed = transformChats(chats);
    chatsStore.set(transformed);
})

export function addChat(data: chat) {
    rawChatsStore.update((val) => {
        return [...val, data]
    })
}

export function getChat(id: string) {
    return {
        chat: get(rawChatsStore).find(chat => chat.id === id),
        index: get(rawChatsStore).findIndex(chat => chat.id === id)
    };
}

export function updateChat(id: string, data: any) {
    const { chat, index } = getChat(id);
    const newChat = {
        ...chat,
        ...data
    }
    rawChatsStore.update((chats) => {
        chats[index] = newChat;
        return chats;
    })
}

// Channel
export const pusherChannel = writable<Channel | null>(null)

export const chatQueue = writable<string[]>([]);
export const sendingChat = writable<boolean>(false);