import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import { hash } from "@/utils/crypto";

export const POST: RequestHandler = async ({ request, locals }) => {

    let session = await locals.getSession()

    if (!session?.user) {
        throw error(401, "Unauthorized")
    }
    const user = session.user;

    let data;

    try {
        data = await request.json() as { roomName: string, visibility: string, password: string };
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