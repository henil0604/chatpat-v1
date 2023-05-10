import log from "@/utils/log";

export default async function fetchUserRooms() {
    try {
        const response = await fetch("/api/dashboard/me/rooms", {
            method: "GET"
        })
        const settings = await response.json();
        return settings.data || null;
    } catch (e) {
        log("[fetchUserRooms]", e, "error")
        return null;
    }
}