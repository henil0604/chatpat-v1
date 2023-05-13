import { prisma } from "@/lib/server/prisma";

export default function getUserSettings(userId: string) {
    return prisma.settings.findFirst({
        where: {
            ownerId: userId
        }
    })
}