import log from "@/utils/log";
import { toastStore } from "@skeletonlabs/skeleton";

export default async function deleteRoom(roomName: string) {
    try {
        const response = await fetch(`/api/r/${roomName}`, {
            method: "DELETE"
        })

        let data = await response.json()

        if (!response.ok) {
            toastStore.trigger({
                message: data.message,
                background: 'variant-filled-error',
                timeout: 5000
            })
        }

        return data;
    } catch (e) {
        log("[deleteRoom]", e, "error")
        return null;
    }
}