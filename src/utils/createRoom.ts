import type { Room } from '@prisma/client'
import { encrypt } from './crypto'
import { PUBLIC_TRANSPORT_SECRET } from '$env/static/public'
import { toastStore } from '@skeletonlabs/skeleton';

export interface CreateRoomOptions {
    name: string
    visibility: string
    password: string
    description: string
}
export default async function createRoom(options: CreateRoomOptions): Promise<Room | null> {

    try {
        if (options.visibility === 'private' && !options.password) {
            throw new Error("Private Visibility requires password")
        }

        options.password = options.visibility === 'private' ? encrypt(options.password, PUBLIC_TRANSPORT_SECRET) : "";

        console.log("options?", options)

        const response = await fetch("/api/dashboard/create", {
            method: "POST",
            body: JSON.stringify({
                ...options
            })
        });

        let data = await response.json();

        if (!response.ok) {
            toastStore.trigger({
                message: data.message,
                background: 'variant-filled-error',
                timeout: 5000
            })
        }

        return data.data;

    } catch (error) {

        console.log("error?", error)
        toastStore.trigger({
            message: "Something went wrong"
        })

        return null;
    }

}