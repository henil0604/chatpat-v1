import type { Room } from "@prisma/client";
import log from "./log";
import { toastStore } from "@skeletonlabs/skeleton";

export default async function fetchExploreFeed(): Promise<Room[] | null> {
    try {
        const response = await fetch("/api/dashboard/explore", {
            method: "GET"
        })

        let data = await response.json();

        if (!response.ok) {
            toastStore.trigger({
                message: data.message,
                background: 'variant-filled-error',
                timeout: 5000
            })
        }

        return data.data;
    } catch (e) {
        log("[fetchExploreFeed]", e, "error")

        toastStore.trigger({
            message: "Something went wrong",
            background: 'variant-filled-error',
            timeout: 5000
        })

        return null;
    }
}