import { INITIAL_USER_WALLET_BALANCE } from "@/const";
import { prisma } from "@/lib/server/prisma";

export default function createWalletForUser(userId: string) {
    return prisma.wallet.create({
        data: {
            balance: INITIAL_USER_WALLET_BALANCE,
            owber: {
                connect: {
                    id: userId
                }
            }
        }
    })
}