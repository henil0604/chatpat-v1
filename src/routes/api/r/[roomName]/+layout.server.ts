import { prisma } from "@/lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {

    const roomName = params.roomName;

    const room = await prisma.room.findFirst({
        where: {
            name: roomName
        }
    })

    if (!room) {
        throw error(404, "Room not found");
    }

    return;
};