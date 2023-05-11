import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import getRoomsByUser from "@/utils/server/getRoomsByUser";
import { CODE } from "@/const";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    let rooms = await getRoomsByUser(user.id as string);

    rooms = rooms.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return json({
        code: CODE.FOUND,
        data: [
            ...rooms
        ]
    });
};