import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import getRoomNameOrThrow from "@/utils/server/getRoomNameOrThrow";
import { error, json } from "@sveltejs/kit";
import getRoomByNameOrThrowIfNotExists from "@/utils/server/getRoomByNameOrThrowIfNotExists";
import { CODE } from "@/const";
import deleteRoomByName from "@/utils/server/deleteRoomByName";

export const DELETE: RequestHandler = async ({ locals, params }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    const roomName = getRoomNameOrThrow(params);

    const room = await getRoomByNameOrThrowIfNotExists(roomName, false)

    if (room.ownerId !== user.id) {
        throw error(401, "Unauthorized")
    }

    const deleted = await deleteRoomByName(room.name);

    return json({
        code: CODE.DELETED,
    })
};