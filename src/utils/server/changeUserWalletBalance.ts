import { prisma } from "@/lib/server/prisma";

export default function changeUserWalletBalance(userId: string, amount: number) {
    return prisma.wallet.update({
        where: {
            ownerId: userId,
        },
        data: {
            balance: {
                increment: amount
            }
        }
    })
}