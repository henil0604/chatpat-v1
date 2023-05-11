import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'
import type { Channel } from 'pusher-js';

export const darkMode = persisted<boolean>("chatpatDarkMode", true)

export const loading = writable(false);
export const roomAccessAllowed = writable<undefined | boolean>(undefined);
export const originalRoomPassword = writable<string | null>(null);


// Channel
export const pusherChannel = writable<Channel | null>(null)