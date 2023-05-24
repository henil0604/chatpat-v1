import { prisma } from "@/lib/server/prisma";

export default function getUserWallet(userId: string) {
    return prisma.wallet.findFirst({
        where: {
            ownerId: userId
        }
    })
}