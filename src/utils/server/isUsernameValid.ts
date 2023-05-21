import getUserByUsername from "@/utils/server/getUserByUsername";

export default async function isUsernameValid(username: string) {
    const user = await getUserByUsername(username);
    if (!user) return true;
    return false;
}