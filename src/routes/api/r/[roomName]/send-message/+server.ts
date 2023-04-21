import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import pusher from "@/lib/server/pusher";
import { cachify, getRoomKey, getStoredRoom } from "@/lib/server/storage";
import type { Room } from "@prisma/client";

export const POST: RequestHandler = async ({ request, locals, params }) => {

	let session = await locals.getSession()

	if (!session?.user) {
		throw error(401, "Unauthorized")
	}
	const user = session.user;
	const roomName = params.roomName;

	if (!roomName) {
		throw error(400, "Room name not found in url")
	}

	let data: { message: string, createdAt: number, id: string, batch: boolean };

	try {
		data = await request.json();
	} catch {
		throw error(400, "Bad Input");
	}

	if (!data.message) {
		throw error(400, "message content not provided")
	}
	if (!data.createdAt) {
		data.createdAt = Date.now()
	}
	if (!data.id) {
		throw error(400, "id is required")
	}

	if (await prisma.chat.findFirst({ where: { id: data.id } })) {
		throw error(400, `Chat with id:"${data.id}" already exists`)
	}

	data.batch = data.batch || false

	if (data.batch && !Array.isArray(data.message)) {
		throw error(400, "While sending batch messages, \"message\" should be array");
	}

	// TODO: Extract function for storing message

	const room = await cachify<Room>(getRoomKey(roomName), () => (prisma.room.findFirst({
		where: {
			name: roomName
		}
	})), { timeout: 1000 * 60 }) // 60 second cache

	if (!room) {
		throw error(404, "Room not found");
	}

	// TODO: Encryption

	// Pusher Event trigger
	try {
		const push = await pusher.trigger(roomName, "new-chat", {
			id: data.id,
			content: data.message,
			createdAt: new Date(data.createdAt),
			owner: user,
			room: room,
			ownerId: user.id as string,
			roomId: room.id
		})
	} catch (e) {
		console.error(e);
	}

	let message;

	prisma.chat.create({
		data: {
			id: data.id,
			content: data.message,
			createdAt: new Date(data.createdAt),
			owner: {
				connect: {
					email: user.email as string
				}
			},
			room: {
				connect: {
					name: roomName
				}
			}
		}
	}).catch(console.error).then((e) => message = e)

	return json({
		message: "Message Sent",
		code: "SENT",
		data: {
			id: data.id,
			content: data.message,
			createdAt: new Date(data.createdAt),
			owner: user,
			room: room,
			ownerId: user.id as string,
			roomId: room.id
		}
	});
};