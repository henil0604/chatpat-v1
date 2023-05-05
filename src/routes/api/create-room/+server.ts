import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import { hash } from "@/utils/crypto";
import type { Room } from "@prisma/client";
import validateSessionAndGetUserOrThrow from "@/utils/validateSessionAndGetUserOrThrow";

export const POST: RequestHandler = async ({ request, locals }) => {

    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    let data: { roomName: string, visibility: string, password: string };;

    try {
        data = await request.json()
    } catch {
        throw error(400, "Bad Input");
    }

    if (!data.roomName) {
        throw error(400, `"roomName" is required`)
    }

    if (!data.visibility) {
        throw error(400, `"visibility" is required`)
    }

    if (data.visibility === "private" && !data.password) {
        throw error(400, `"password" is required if room visibility is "private"`)
    }

    let room = await prisma.room.findFirst({
        where: {
            name: data.roomName
        }
    })

    if (room) {
        throw error(400, `room "${data.roomName}" already exists`)
    }

    room = await prisma.room.create({
        data: {
            name: data.roomName,
            visibility: data.visibility,
            password: data.visibility === "private" ? hash(data.password) : null,
            owner: {
                connect: {
                    email: user.email as string
                }
            }
        }
    })

    return json({
        message: "Room Created",
        code: 'CREATED',
        data: {
            ...room
        }
    })
};