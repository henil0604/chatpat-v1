import { prisma } from "@/lib/server/prisma";

export default function findChatById(id: string) {
    return prisma.chat.findFirst({ where: { id: id } })
}