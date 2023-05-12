import { sendingChat, updateChat } from "@/store";

export default async function sendMessage(roomName: string, data: any) {
    sendingChat.set(true);
    const response = await fetch(`/api/r/${roomName}/send-message`, {
        method: "post",
        body: JSON.stringify(data),
    });
    sendingChat.set(false);
    updateChat(data.id, { atClient: false });
}
