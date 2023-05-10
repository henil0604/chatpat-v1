import log from "@/utils/log";
import kv from "@vercel/kv";

export function getRoomKey(roomName: string) {
    return `r-${roomName}`
}

export function getChatKey(id: string) {
    return `chat-${id}`
}
interface CachifyOptions {
    timeout: number,
    force: boolean
}
export async function cachify<T>(key: string, fallback: any, options?: Partial<CachifyOptions>): Promise<T> {
    const startTime = Date.now();
    let returnData: T | null = null;
    if (!options?.force) {
        const storedData: any = await kv.get(key);
        options = options || {}
        if (storedData) {
            returnData = storedData;
        }
    }
    if (options.force || returnData === null) {
        const newData = await fallback();
        await kv.set(key, newData, { px: options.timeout || -1 });
        returnData = newData;
    }
    const endTime = Date.now();
    log(`[cachify]`, `${key} ${endTime - startTime}ms`, 'info')
    return returnData as T;
}