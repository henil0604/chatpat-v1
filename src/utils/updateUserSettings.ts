import log from "@/utils/log";

export default async function updateUserSettings(key: string, value: any) {
    try {
        const response = await fetch("/api/dashboard/me/settings", {
            method: "PATCH",
            body: JSON.stringify({
                key,
                value
            })
        })

        const settings = await response.json();

        return settings.data || null;
    } catch (e) {
        log("[updateUserSettings]", e, "error")
        return null;
    }
}