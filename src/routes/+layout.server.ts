import { redirect } from "@sveltejs/kit";
import isProtectedRoute from "@/utils/isProtectedRoute";


/** @type {import('./$types').PageLoad} */
export async function load({ locals, url }) {
    const session = await locals.getSession();

    if (url.pathname.startsWith("/login")) {
        return {};
    }

    if ((!session || !session?.user) && isProtectedRoute(url.pathname)) {
        const fromUrl = url.pathname + url.search;
        throw redirect(301, `/login?redirectTo=${fromUrl}`)
    }

    return {
        session: session || null,
        user: session?.user || null
    }
}
