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
		const push = pusher.trigger(roomName, "new-chat", {
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

	// creating chat in database but not waiting for it to finish because it will take more time to complete the request and not needed to be waited
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
	}).catch(console.error).then((e) => () => {
		// TODO: send warning to all users that this message was not stored in database
	})

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