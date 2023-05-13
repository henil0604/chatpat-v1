import { cachify, getChatKey } from "@/lib/server/kv";
import { prisma } from "@/lib/server/prisma";
import type { Chat } from "@prisma/client";

export default function getChatById(id: string, useCachify = false) {
    return cachify<Chat>(
        getChatKey(id),
        () => (prisma.chat.findFirst({
            where: {
                id
            }
        })),
        { timeout: 1000 * 60 * 1, force: !useCachify }  // 1 minute cache
    )
}