import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import { hash } from "@/utils/crypto";
import type { Room } from "@prisma/client";
import validateSessionAndGetUserOrThrow from "@/utils/validateSessionAndGetUserOrThrow";
import validateInput from "@/utils/validateInput";
import { z } from "zod";
import getRoomByName from "@/utils/getRoomByName";

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

    return json({
        message: "Room Created",
        code: 'CREATED',
        data: {
            ...room
        }
    })
};