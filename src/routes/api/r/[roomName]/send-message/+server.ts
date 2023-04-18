import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import pusher from "@/lib/server/pusher";

export const POST: RequestHandler = async ({ request, locals, params }) => {

    let session = await locals.getSession()

    if (!session?.user) {
        throw error(401, "Unauthorized")
    }
    const user = session.user;
    const roomName = params.roomName;

    if (!roomName) {
        throw error(400, "Room name not found in url")
    }

    let data: { message: string, createdAt: number, id: string };

    try {
        data = await request.json();
    } catch {
        throw error(400, "Bad Input");
    }

    if (!data.message) {
        throw error(400, "message content not provided")
    }
    if (!data.createdAt) {
        data.createdAt = Date.now()
    }

    if (data.id && (await prisma.chat.findFirst({ where: { id: data.id } }))) {
        throw error(400, `Chat with id:"${data.id}" already exists`)
    }

    const room = await prisma.room.findFirst({
        where: {
            name: roomName
        }
    })

    if (!room) {
        throw error(404, "Room not found");
    }

    // TODO: Encryption

    let message;
    try {
        message = await prisma.chat.create({
            data: {
                id: data.id || undefined,
                content: data.message,
                createdAt: new Date(data.createdAt),
                owner: {
                    connect: {
                        email: user.email as string
                    }
                },
                room: {
                    connect: {
                        name: roomName
                    }
                }
            }
        })
    } catch (e) {
        console.error(e);
        throw error(500, "Something went wrong")
    };


    // Pusher Event trigger
    try {
        const push = await pusher.trigger(roomName, "new-chat", {
            ...message,
            owner: user,
            room: room
        })
    } catch (e) {
        console.error(e);
    }


    return json({
        message: "Message Sent",
        code: "SENT",
        data: {
            ...message
        }
    });
};