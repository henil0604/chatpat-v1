import log from "@/utils/log";

export default async function setUsername(username: string) {
    try {
        const response = await fetch(`/api/dashboard/me/setUsername`, {
            method: "POST",
            body: JSON.stringify({
                username
            })
        })

        const data = await response.json()

        return data;
    } catch (e) {
        log("[setUsername]", e, "error")
        return false;
    }
}