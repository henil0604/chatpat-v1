import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";

export const GET: RequestHandler = async ({ request, locals, params }) => {

    const roomName = params.roomName;

    let room = await prisma.room.findFirst({
        where: {
            name: roomName
        },
        include: {
            owner: true
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