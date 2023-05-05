import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import { encrypt, hash } from "@/utils/crypto";
import validateSessionAndGetUserOrThrow from "@/utils/validateSessionAndGetUserOrThrow";
import validateInput from "@/utils/validateInput";
import { z } from "zod";
import getRoomByName from "@/utils/getRoomByName";
import { MESSAGE_STORE_SECRET } from "$env/static/private";

export const POST: RequestHandler = async ({ request, locals }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    // schema for request data
    let schema = z.object({
        roomName: z.string(),
        visibility: z.enum([
            'public',
            'unlisted',
            'private'
        ]),
        password: z.string().optional()
    })

    // Getting data from request
    const data = await validateInput<z.infer<typeof schema>>(schema, request.json())

    // if visibility is private there must be a password
    if (data.visibility === "private" && !data.password) {
        throw error(400, `"password" is required if room visibility is "private"`)
    }

    // getting room
    let room = await getRoomByName(data.roomName, false);

    // if room already exists throwing error
    if (room) {
        throw error(400, `room "${data.roomName}" already exists`)
    }

    room = await prisma.room.create({
        data: {
            name: data.roomName,
            visibility: data.visibility,
            // hashing password
            password: data.visibility === "private" ? hash(data.password as string) : null,
            owner: {
                connect: {
                    email: user.email as string
                }
            }
        }
    })

    // After event
    await prisma.chat.create({
        data: {
            room: {
                connect: {
                    name: data.roomName
                }
            },
            content: encrypt(`${user.name} created this room`, MESSAGE_STORE_SECRET),
            type: 'label',
            owner: {
                connect: {
                    id: user.id as string
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