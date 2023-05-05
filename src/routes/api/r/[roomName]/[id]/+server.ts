import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import { cachify, getChatKey } from "@/lib/server/storage";
import validateSessionAndGetUserOrThrow from "@/utils/validateSessionAndGetUserOrThrow";
import getRoomNameOrThrow from "@/utils/getRoomNameOrThrow";

export const GET: RequestHandler = async ({ locals, params }) => {

    const user = await validateSessionAndGetUserOrThrow(locals.getSession);
    const roomName = getRoomNameOrThrow(params);

    const chatId = params.id;

    const chat = await cachify(getChatKey(chatId), () => (prisma.chat.findFirst({
        where: {
            id: chatId
        },
        include: {
            owner: true,
            room: true
        }
    })), { timeout: 1000 * 60 * 1 }) // 1 minute cache

    if (!chat) {
        throw error(404, "Chat Not found")
    }

    return json({
        message: 'Chat found',
        code: 'FOUND',
        data: {
            ...chat
        }
    })

};