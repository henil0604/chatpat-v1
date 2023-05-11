import getRoomByName from '@/utils/server/getRoomByName.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {

    const roomName = params.roomName;

    const room = await getRoomByName(roomName, true);

    return {
        room
    }
};