import { prisma } from "@/lib/server/prisma";
import type { Room } from "@prisma/client";
import { encrypt } from "../crypto";
import { MESSAGE_STORE_SECRET } from "$env/static/private";

export default function addChat(room: Room, user: App.Session["user"], data: { id: string, message: string, createdAt: number }) {
    return prisma.chat.create({
        data: {
            id: data.id,
            content: encrypt(data.message, MESSAGE_STORE_SECRET),
            createdAt: new Date(data.createdAt),
            owner: {
                connect: {
                    email: user?.email as string
                }
            },
            room: {
                connect: {
                    name: room.name
                }
            }
        }
    })
}