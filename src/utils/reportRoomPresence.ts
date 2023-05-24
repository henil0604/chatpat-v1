import log from "@/utils/log";
import { toastStore } from "@skeletonlabs/skeleton";
import refetchUser from "@/utils/refetchUser";

export default async function reportRoomPresence(roomName: string) {

    console.log("showing presence")
    try {
        const response = await fetch(`/api/r/${roomName}/report-presence`, {
            method: "POST"
        })

        let data = await response.json()

        if (!response.ok) {
            toastStore.trigger({
                message: data.message,
                background: 'variant-filled-error',
                timeout: 5000
            })
        }

        refetchUser()
        return data;
    } catch (e) {
        log("[deleteRoom]", e, "error")
        return null;
    }
}