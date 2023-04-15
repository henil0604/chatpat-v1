import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals, params }) => {

    let session = await locals.getSession()

    if (!session?.user) {
        throw error(401, "Unauthorized")
    }
    const user = session.user;
    const roomName = params.roomName;
    const chatId = params.id;



    return new Response();
};