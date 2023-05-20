import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const doNotRemoveRooms = ['alpha-version-dev-logs', "give-feedback", "askus"];

const allRooms = await prisma.room.findMany()

console.log(`Room Count: ${allRooms.length}`);
for (const room of allRooms) {
    console.log(`Checking: ${room.name}`);
    if (doNotRemoveRooms.includes(room.name)) {
        console.log(`Skipping: ${room.name}`);
        continue
    };

    console.log(`Preparing to delete: ${room.name}`)

    await prisma.room.delete({
        where: {
            name: room.name
        }
    })

    console.log(`Deleted room: ${room.name}`);
}
