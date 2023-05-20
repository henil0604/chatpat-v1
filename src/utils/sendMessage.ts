import { sendingChat, updateChat } from "@/store";

export default async function sendMessage(roomName: string, data: any) {
    sendingChat.set(true);
    try {
        const response = await fetch(`/api/r/${roomName}/send-message`, {
            method: "post",
            body: JSON.stringify(data),
        });
        updateChat(data.id, { atClient: false });
    } catch (e) {
        updateChat(data.id, { failed: true });
    }
    sendingChat.set(false);
}
