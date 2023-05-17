import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import getRoomNameOrThrow from "@/utils/server/getRoomNameOrThrow";
import pusher from "@/lib/server/pusher";
import { CODE } from "@/const";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals, params }) => {

    // Validating Session
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);
    // getting roomname or throwing error if does not exist
    const roomName = getRoomNameOrThrow(params);

    pusher.trigger(`r-${roomName}`, 'join', {
        user: {
            name: user.name,
            id: user.id
        }
    })

    return json({
        code: CODE.DONE
    })
}