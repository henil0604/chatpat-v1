// @ts-nocheck

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/server/prisma";
import createSettingsForUser from "@/utils/server/createSettingsForUser";
import getUserSettings from "@/utils/server/getUserSettings";
import log from "@/utils/log";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import isProtectedRoute from "./utils/isProtectedRoute";

const authHandle: Handle = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Google({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET
        })
    ],
    secret: AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: async ({ session, user }) => {

            if (session.user) {
                session.user.id = user.id;
                session.user.username = user.username;
            }

            try {
                const settings = await getUserSettings(user.id);
                session.user.settings = settings;
            } catch (e) {
                log(`[hooks][callbacks][session]`, e, 'error')
            }

            return session;
        }
    },
    events: {
        async createUser({ user }) {
            try {
                await createSettingsForUser(user.id);
            } catch (e) {
                log(`[hooks][events][createUser]`, e, 'error')
            }

        }
    }
})

const onBoardingHandle: Handle = async ({ event, resolve }) => {
    const session = await event.locals.getSession();

    if (isProtectedRoute(event.url.pathname) && session?.user && !session.user.username) {
        throw redirect(301, `/onboarding?redirectTo=${event.url.pathname}`)
    }

    if (session?.user && session.user.username && event.url.pathname === "/onboarding") {
        throw redirect(301, "/dashboard")
    }

    return resolve(event);
}


export const handle = sequence(authHandle, onBoardingHandle);