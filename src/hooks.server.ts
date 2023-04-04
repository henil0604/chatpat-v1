// @ts-nocheck

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/core/providers/github';
import { } from '@next-auth/prisma-adapter'
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/server/prisma";

export const handle = SvelteKitAuth({
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
