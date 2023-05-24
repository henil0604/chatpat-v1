import type { Room, User } from "@prisma/client";
import log from "./log";
import { toastStore } from "@skeletonlabs/skeleton";

export default async function fetchSessionUser(): Promise<App.Session['user'] | null> {
    try {
        const response = await fetch("/api/dashboard/me", {
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

        return data;
    } catch (e) {
        log("[fetchSesionUser]", e, "error")

        toastStore.trigger({
            message: "Something went wrong",
            background: 'variant-filled-error',
            timeout: 5000
        })

        return null;
    }
}