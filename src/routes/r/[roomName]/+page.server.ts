import { prisma } from '@/lib/server/prisma.js';

// export const ssr = false;
// export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals, url, fetch }) {

    const roomName = params.roomName;

    let room;
    try {
        const response = await fetch(`/api/r/${roomName}`)

        const data = await response.json()

        if (response.status === 404) {
            room = null;
        }

        if (data.code === "FOUND") {
            room = data.data;
        }

    } catch { }

    return {
        room: room || null
    };
}