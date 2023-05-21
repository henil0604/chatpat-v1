import { prisma } from "@/lib/server/prisma";

export default function getUserByUsername(username: string) {
    return prisma.user.findFirst({
        where: { username }
    })
}