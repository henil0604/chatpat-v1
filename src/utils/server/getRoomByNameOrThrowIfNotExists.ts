import getRoomByName from "@/utils/server/getRoomByName";
import { error } from "@sveltejs/kit";

export default async function getRoomByNameOrThrowIfNotExists(roomName: string, useCachify: boolean) {
    const room = await getRoomByName(roomName, useCachify)

    if (!room) {
        throw error(404, "Room not found");
    }

    return room;
}