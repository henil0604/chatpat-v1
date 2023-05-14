import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import getExploreRooms from "@/utils/server/getExploreRooms";
import { CODE } from "@/const";
import { prisma } from "@/lib/server/prisma";

export const GET: RequestHandler = async ({ locals }) => {

    // validating user
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    const rooms = await getExploreRooms()

    return json({
        code: CODE.FOUND,
        data: [...rooms]
    });
};