import { error } from "@sveltejs/kit";

export default function getRoomNameOrThrow(params: any) {
    const roomName = params.roomName;

    if (!roomName) {
        throw error(400, "Room name not found in url")
    }

    return roomName;
}