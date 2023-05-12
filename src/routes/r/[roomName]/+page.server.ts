import { MESSAGE_STORE_SECRET } from '$env/static/private';
import { prisma } from '@/lib/server/prisma.js';
import { decrypt } from '@/utils/crypto.js';
import getRoomByName from '@/utils/server/getRoomByName.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {

    const roomName = params.roomName;

    const room = await getRoomByName(roomName, true)

    let chats = await prisma.chat.findMany({
        where: {
            roomId: room.id
        },
        orderBy: {
            createdAt: "asc"
        },
        // take: -20,
        include: {
            owner: true,
            room: true
        }
    })

    chats = chats.map(chat => {
        chat.content = decrypt(chat.content, MESSAGE_STORE_SECRET)
        return chat;
    })

    return {
        room,
        chats
    }
};