import { userStore } from "@/store";
import fetchSessionUser from "./fetchSessionUser";

export default async function refetchUser() {
    let user = await fetchSessionUser()
    userStore.set(user);
}