import { cachify } from "@/lib/server/kv";
import { prisma } from "@/lib/server/prisma";
import type { Room, User } from "@prisma/client";

export default async function getExploreRooms() {

    let allRooms = await cachify<(Room & { owner: User })[]>(
        `explore-rooms`,
        () => (prisma.room.findMany({
            include: {
                owner: true
            }
        })),
        { timeout: 1000 * 20 }  // 20 seconds cache
    )

    return allRooms
        .filter((room) => {
            return room.visibility === 'public'
        })
        .sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
}