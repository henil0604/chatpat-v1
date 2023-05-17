import log from "@/utils/log";

export default async function sendRoomJoinEvent(roomName: string) {
    try {
        const response = await fetch(`/api/r/${roomName}/user-join-event`, {
            method: "POST"
        })
    } catch (e) {
        log("[sendRoomJoinEvent]", e, "error")
        return null;
    }
}