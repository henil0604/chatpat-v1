// @ts-nocheck

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/server/prisma";

export const handle = SvelteKitAuth({
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
        session: ({ session, user }) => {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },

    },
    events: {
        createUser: ({ user }) => {

        }
    }
})
