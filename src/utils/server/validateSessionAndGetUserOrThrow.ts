import { error } from "@sveltejs/kit";

export default async function validateSessionAndGetUserOrThrow(getSession: App.Locals["getSession"]) {
    let session = await getSession()
    if (!session?.user) {
        throw error(401, "Unauthorized")
    }

    return session.user;
}