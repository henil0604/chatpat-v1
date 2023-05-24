import { get, writable } from "svelte/store";

interface Activity {
    event: keyof WindowEventMap,
    path: string,
    meta?: any,
    timestamp: Date
}
export const userActivity = writable<Activity[]>([]);

export function addActivity(data: Activity) {
    userActivity.update((e) => {
        e.push(data);
        return e;
    })
}

export function isInactive(threshold = 30) {
    const activities = get(userActivity);
    const lastActivity = activities[activities.length - 1];
    if (!lastActivity) return true
    if (Date.now() - lastActivity.timestamp.getTime() > threshold * 1000) {
        return true;
    }
    return false;
}