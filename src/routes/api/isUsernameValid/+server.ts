import { prisma } from '@/lib/server/prisma.js';
import getUserByUsername from '@/utils/server/getUserByUsername.js';
import isUsernameValid from '@/utils/server/isUsernameValid.js';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url }) => {

    const username = url.searchParams.get("username");

    if (!username) {
        throw error(400, "Bad Input")
    }

    return json({
        valid: await isUsernameValid(username)
    })
}