import log from "@/utils/log";

export default async function sendRoomJoinEvent(roomName: string) {
    try {
        const response = await fetch(`/api/r/${roomName}/user-leave-event`, {
            method: "POST"
        })
    } catch (e) {
        log("[sendRoomLeaveEvent]", e, "error")
        return null;
    }
}