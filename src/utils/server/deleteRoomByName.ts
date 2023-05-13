import { prisma } from "@/lib/server/prisma";

export default function deleteRoomByName(roomName: string) {
    return prisma.room.delete({
        where: {
            name: roomName
        }
    })
}