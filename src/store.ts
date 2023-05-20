import { persisted } from 'svelte-local-storage-store'
import { get, writable } from 'svelte/store'
import type { Channel } from 'pusher-js';
import type { Chat, Room, User } from '@prisma/client';
import type { block } from '@/utils/transformChats';
import transformChats from '@/utils/transformChats';

export const darkMode = persisted<boolean>("chatpatDarkMode", true)

export const userStore = writable<User | null>(null);

export const loading = writable(false);
export const roomAccessAllowed = writable<undefined | boolean>(undefined);
export const originalRoomPassword = writable<string | null>(null);
export const roomStore = writable<Room | null>(null);

// Channel
export const pusherChannel = writable<Channel | null>(null)

export type chat = Chat & { room: Room, owner: User, atClient?: boolean, failed?: boolean };
export const chatsStore = writable<block[]>([]);
export const rawChatsStore = writable<chat[]>([]);

rawChatsStore.subscribe((chats) => {
    const transformed = transformChats(chats);
    console.log(transformed)
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

export const chatQueue = writable<string[]>([]);
export const sendingChat = writable<boolean>(false);