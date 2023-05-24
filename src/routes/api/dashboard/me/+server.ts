import validateSessionAndGetUserOrThrow from '@/utils/server/validateSessionAndGetUserOrThrow.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    return json({
        ...user || {}
    })
};