import type { Wallet } from "@prisma/client";
import { error } from "@sveltejs/kit";

export default function hasEnoughMoneyOrThrow(wallet: Wallet, cost: number) {
    if (wallet.balance < cost) {
        throw error(400, "Not Enough coins")
    }

    return true;
}