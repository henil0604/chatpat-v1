import { prisma } from "@/lib/server/prisma";

export default function getRoomsByUser(userId: string) {
    return prisma.room.findMany({
        where: {
            ownerId: userId
        }
    })
}