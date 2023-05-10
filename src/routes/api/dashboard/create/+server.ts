import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import validateInput from "@/utils/server/validateInput";
import { Visibility } from "@prisma/client";
import { CODE, REGEX } from "@/const";
import { error, json } from "@sveltejs/kit";
import createRoom from "@/utils/server/createRoom";
import getRoomByName from "@/utils/server/getRoomByName";
import { decrypt } from "@/utils/crypto";
import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";

export const POST: RequestHandler = async ({ locals, request }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    // schema for request data
    let schema = z.object({
        name: z.string().regex(REGEX.alphanumeric),
        description: z.string(),
        visibility: z.enum(["UNLISTED", "PUBLIC", "PRIVATE"]),
        password: z.string(),
    })

    // Getting data from request
    const data = await validateInput<z.infer<typeof schema>>(schema, request.json());

    if (data.visibility === Visibility.PRIVATE && (!data.password || data.password.trim() === "")) {
        return json({
            code: CODE.VALIDATION_ERROR,
            message: "Password is required if room visibility is private"
        }, { status: 400 });
    }

    try {
        data.password = decrypt(data.password, PUBLIC_TRANSPORT_SECRET)
    } catch { }

    console.log("data?", data)

    if (await getRoomByName(data.name)) {
        return json({
            code: CODE.VALIDATION_ERROR,
            message: "Room already exists"
        }, { status: 400 });
    }

    const room = await createRoom({
        ...data
    }, user)

    console.log(room)

    return json({
        code: CODE.CREATED,
        message: "Room created",
        data: { ...room }
    });
};