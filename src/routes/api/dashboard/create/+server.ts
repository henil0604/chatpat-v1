import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import validateInput from "@/utils/server/validateInput";
import { CODE, PRIVATE_ROOM_CREATION_PRICE, PUBLIC_ROOM_CREATION_PRICE, REGEX, UNLISTED_ROOM_CREATION_PRICE } from "@/const";
import { error, json } from "@sveltejs/kit";
import createRoom from "@/utils/server/createRoom";
import getRoomByName from "@/utils/server/getRoomByName";
import { decrypt } from "@/utils/crypto";
import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";
import changeUserWalletBalance from "@/utils/server/changeUserWalletBalance";

function getRoomPriceByVisibility(visibility: string) {
    if (visibility === 'public') return PUBLIC_ROOM_CREATION_PRICE;
    if (visibility === "unlisted") return UNLISTED_ROOM_CREATION_PRICE;
    if (visibility === "private") return PRIVATE_ROOM_CREATION_PRICE;
    return 0;
}

export const POST: RequestHandler = async ({ locals, request }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    // schema for request data
    let schema = z.object({
        name: z.string().regex(REGEX.alphanumeric),
        description: z.string(),
        visibility: z.enum(["unlisted", "public", "private"]),
        password: z.string(),
    })

    // Getting data from request
    const data = await validateInput<z.infer<typeof schema>>(schema, request.json());

    if (data.visibility === 'private' && (!data.password || data.password.trim() === "")) {
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

    const cost = getRoomPriceByVisibility(data.visibility);

    await changeUserWalletBalance(user.id as string, -cost)

    console.log(room)

    return json({
        code: CODE.CREATED,
        message: "Room created",
        data: { ...room }
    });
};