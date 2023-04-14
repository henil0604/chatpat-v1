import { writable } from 'svelte/store';

export const loading = writable<boolean>(false);
export const loadingMessage = writable<string>("");