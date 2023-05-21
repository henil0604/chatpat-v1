import log from "@/utils/log";

export default async function isUsernameValid(username: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/isUsernameValid?username=${username}`, {
            method: "GET",
        })
        const { valid } = await response.json();
        return valid;
    } catch (e) {
        log("[isUsernameValid]", e, "error")
        return false;
    }
}