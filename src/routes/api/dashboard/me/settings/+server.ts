import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import createSettingsForUser from "@/utils/server/createSettingsForUser";
import getUserSettings from "@/utils/server/getUserSettings";
import { json } from "@sveltejs/kit";
import { z } from "zod";
import validateInput from "@/utils/server/validateInput";
import { prisma } from "@/lib/server/prisma";

export const GET: RequestHandler = async ({ locals, request }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    let settings = await getUserSettings(user.id as string);

    if (!settings) {
        settings = await createSettingsForUser(user.id as string);
    }

    return json({
        code: 'FOUND',
        data: {
            ...settings
        }
    });
};

export const PATCH: RequestHandler = async ({ locals, request }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);


    // schema for request data
    let schema = z.object({
        key: z.string({
            required_error: "key is required"
        }),
        value: z.any({
            required_error: 'value is required'
        })
    })

    // Getting data from request
    const data = await validateInput<z.infer<typeof schema>>(schema, request.json());

    const updated = await prisma.settings.update({
        where: {
            ownerId: user.id as string
        },
        data: {
            [data.key]: data.value
        }
    })

    return json({
        code: 'UPDATED',
        data: {
            ...updated
        }
    });
};


