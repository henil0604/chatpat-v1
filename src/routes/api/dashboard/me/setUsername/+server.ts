import { CODE } from "@/const.js";
import { prisma } from "@/lib/server/prisma.js";
import log from "@/utils/log";
import isUsernameValid from "@/utils/server/isUsernameValid.js";
import validateInput from "@/utils/server/validateInput";
import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import { error, json } from "@sveltejs/kit";
import { z } from "zod";

export const POST = async ({ locals, request }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);


    // schema for request data
    let schema = z.object({
        username: z.string({
            required_error: "username is required"
        })
    })

    // Getting data from request
    const data = await validateInput<z.infer<typeof schema>>(schema, request.json());

    if (!await isUsernameValid(data.username)) {
        return json({
            code: CODE.VALIDATION_ERROR,
            message: "Username is already taken"
        }, {
            status: 400
        })
    }

    try {
        await prisma.user.update({
            where: {
                id: user.id as string
            },
            data: {
                username: data.username
            }
        })
    } catch (e) {
        log(`[dashboard][me][setUsername]`, e, "error");
        throw error(500, "Something went wrong")
    }

    return json({
        code: CODE.DONE,
        message: "Username updated"
    })
};