import { prisma } from "@/lib/server/prisma";

export default function createSettingsForUser(userId: string) {
    return prisma.settings.create({
        data: {
            owner: {
                connect: {
                    id: userId
                }
            }
        }
    })
}