import { prisma } from "@/lib/server/prisma";
import type { Room } from "@prisma/client";
import type { CreateRoomOptions } from "@/utils/createRoom";
import { hash } from "@/utils/crypto";

export default function createRoom(options: CreateRoomOptions, user: App.Session["user"]) {
    return prisma.room.create({
        data: {
            name: options.name,
            description: options.description,
            owner: {
                connect: {
                    id: user?.id as string
                }
            },
            visibility: options.visibility,
            password: hash(options.password)
        }
    })
}