import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "@/lib/server/prisma";
import pusher from "@/lib/server/pusher";
import validateSessionAndGetUserOrThrow from "@/utils/validateSessionAndGetUserOrThrow";
import getRoomNameOrThrow from "@/utils/getRoomNameOrThrow";
import { z } from "zod";
import validateInput from "@/utils/validateInput";
import getChatById from "@/utils/getChatById";
import getRoomOrThrowNotExist from "@/utils/getRoomOrThrowNotExist";
import log from "@/utils/log";
import { encrypt } from "@/utils/crypto";
import { MESSAGE_STORE_SECRET } from "$env/static/private";

export const POST: RequestHandler = async ({ request, locals, params }) => {

	// Validating Session
	const user = await validateSessionAndGetUserOrThrow(locals.getSession);
	// getting roomname or throwing error if does not exist
	const roomName = getRoomNameOrThrow(params);

	// schema for request data
	let schema = z.object({
		message: z.string({
			required_error: 'message content not provided'
		}),
		createdAt: z.number().optional().default(Date.now()), // default to server time
		id: z.string({
			required_error: 'id is required'
		}),
	})

	// Getting data from request
	const data = await validateInput<z.infer<typeof schema>>(schema, request.json())

	// check if chat already exist with `id` provided by client
	if (await getChatById(data.id)) {
		throw error(400, `Chat with id:"${data.id}" already exists`)
	}

	// Getting room
	const room = await getRoomOrThrowNotExist(roomName, true);

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

	// creating chat in database
	let message;
	try {
		message = await prisma.chat.create({
			data: {
				id: data.id,
				content: encrypt(data.message, MESSAGE_STORE_SECRET),
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
		})
	} catch (error) {
		log(`[send-message] [store-chat]`, error, 'error')
		console.error(error);
		// TODO: send warning to all users that this message was not stored in database
	}

	return json({
		message: "Message Sent",
		code: "SENT",
		data: {
			...message
		}
	});
};