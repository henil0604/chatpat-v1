import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import getRoomNameOrThrow from "@/utils/getRoomNameOrThrow";

export const GET: RequestHandler = async ({ request, locals, params, url }) => {

    const roomName = getRoomNameOrThrow(params);

    // getting room
    let room = await prisma.room.findFirst({
        where: {
            name: roomName
        },
        include: {
            owner: true,
            Chat: {
                orderBy: {
                    createdAt: "asc"
                },
                // take: -20,
                include: {
                    owner: true
                }
            }
        }
    })

    if (!room) {
        throw error(404, "Room Not Found")
    }

    return json({
        message: "Room Found",
        code: 'FOUND',
        data: {
            ...room
        }
    })
};