import { CODE, REWARDS } from '@/const.js';
import changeUserWalletBalance from '@/utils/server/changeUserWalletBalance.js';
import validateSessionAndGetUserOrThrow from '@/utils/server/validateSessionAndGetUserOrThrow.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals }) => {

    const user = await validateSessionAndGetUserOrThrow(locals.getSession);

    await changeUserWalletBalance(user.id as string, REWARDS.ROOM_PRESENCE)

    return json({
        code: CODE.DONE
    });
};