import { prisma } from "@/lib/server/prisma";
import { cachify, getRoomKey } from "@/lib/server/storage";
import type { Room } from "@prisma/client";

export default function getRoomByName(roomName: string, useCachify = false) {
    return cachify<Room>(
        getRoomKey(roomName),
        () => (prisma.room.findFirst({
            where: {
                name: roomName
            }
        })),
        { timeout: 1000 * 60 * 1, force: !useCachify }  // 1 minute cache
    )
}