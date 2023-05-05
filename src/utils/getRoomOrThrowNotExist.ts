import { prisma } from "@/lib/server/prisma";
import { cachify, getRoomKey } from "@/lib/server/storage";
import type { Room } from "@prisma/client";
import { error } from "@sveltejs/kit";
import getRoomByName from "./getRoomByName";

export default async function getRoomOrThrowNotExist(roomName: string, useCachify = false) {
    const room = await getRoomByName(roomName, useCachify)

    if (!room) {
        throw error(404, "Room not found");
    }

    return room;
}