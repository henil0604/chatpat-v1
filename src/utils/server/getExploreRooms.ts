import { cachify } from "@/lib/server/kv";
import { prisma } from "@/lib/server/prisma";
import { Visibility, type Room } from "@prisma/client";

export default async function getExploreRooms() {

    let allRooms = await cachify<Room[]>(
        `explore-rooms`,
        () => (prisma.room.findMany()),
        { timeout: 1000 * 60 * 1 }  // 1 minute cache
    )

    return allRooms
        .filter((room) => {
            return room.visibility === Visibility.PUBLIC
        })
        .sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
}