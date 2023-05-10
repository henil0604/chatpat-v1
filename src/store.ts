import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'

export const darkMode = persisted<boolean>("chatpatDarkMode", true)

export const loading = writable(false);