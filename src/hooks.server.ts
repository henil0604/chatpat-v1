// @ts-nocheck

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/core/providers/github';
import { } from '@next-auth/prisma-adapter'
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/server/prisma";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import isLoggedIn from "@/utils/isLoggedIn";

function isProtectedRoute(url: string): boolean {
    const ProtectedRoutes = [
        "/preregister"
    ]

    return ProtectedRoutes.some(route => {
        if (route === '*') {
            // Wildcard match - all routes are protected
            return true;
        } else if (route.endsWith('*')) {
            // Prefix wildcard match - match all routes that start with the prefix
            const prefix = route.slice(0, -1);
            return url.startsWith(prefix);
        } else if (route.startsWith('*')) {
            // Suffix wildcard match - match all routes that end with the suffix
            const suffix = route.slice(1);
            return url.endsWith(suffix);
        } else {
            // Exact match
            return url === route;
        }
    });
}

const authGuard: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith("/login")) {
        return await resolve(event);
    }

    if (!(await event.locals.getSession()) && isProtectedRoute(event.url.pathname)) {
        const fromUrl = event.url.pathname + event.url.search;
        throw redirect(301, `/login?redirectTo=${fromUrl}`)
    }

    return await resolve(event);
}

const auth = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        })
    ],
    secret: AUTH_SECRET,
    adapter: PrismaAdapter(prisma),

})

export const handle = sequence(auth, authGuard);
