import getRoomNameOrThrow from "@/utils/server/getRoomNameOrThrow";
import validateSessionAndGetUserOrThrow from "@/utils/server/validateSessionAndGetUserOrThrow";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import { z } from "zod";
import validateInput from "@/utils/server/validateInput";
import getChatById from "@/utils/server/getChatById";
import { decrypt, encrypt } from "@/utils/crypto";
import { PUBLIC_TRANSPORT_SECRET } from "$env/static/public";
import pusher from "@/lib/server/pusher";
import getRoomByNameOrThrowIfNotExists from "@/utils/server/getRoomByNameOrThrowIfNotExists";
import log from "@/utils/log";
import addChat from "@/utils/server/addChat";
import { CODE } from "@/const";
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
	if (await getChatById(data.id, false)) {
		throw error(400, `Chat with id:"${data.id}" already exists`)
	}

	// Getting room
	const room = await getRoomByNameOrThrowIfNotExists(roomName, true);

	// Decrypting message
	data.message = decrypt(data.message, PUBLIC_TRANSPORT_SECRET);

	// Pusher Event trigger
	try {
		const push = await pusher.trigger(`r-${roomName}`, "new-chat", {
			id: data.id,
			content: encrypt(data.message, PUBLIC_TRANSPORT_SECRET),
			createdAt: new Date(data.createdAt),
			owner: user,
			room: room,
			ownerId: user.id as string,
			roomId: room.id
		})
	} catch (e) {
		log(`[r-${roomName}][send-message][pusher]`, e, "error");
		throw error(500, "Something went wrong while broadcasting")
	}

	// creating chat in database
	let message;
	try {
		message = await addChat(room, user, { id: data.id, message: data.message, createdAt: data.createdAt })
	} catch (error) {
		log(`[r-${roomName}][send-message][store-chat]`, error, 'error')
		// @ts-ignore
		throw error(500, "Something went wrong with database query")
		// TODO: send warning to all users that this message was not stored in database
	}

	return json({
		message: "Message Sent",
		code: CODE.CREATED,
		data: {
			...message
		}
	});
}
