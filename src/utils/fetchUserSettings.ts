import log from "@/utils/log";

export default async function fetchUserSettings() {
    try {
        const response = await fetch("/api/dashboard/me/settings", {
            method: "GET"
        })

        const settings = await response.json();

        return settings.data || null;
    } catch (e) {
        log("[fetchUserSettings]", e, "error")
        return null;
    }
}