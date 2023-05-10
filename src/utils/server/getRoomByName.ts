import { prisma } from "@/lib/server/prisma";

export default function getRoomByName(roomName: string) {
    return prisma.room.findFirst({
        where: {
            name: roomName
        }
    });
}