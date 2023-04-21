import type { Room } from '@prisma/client';
import storage from 'node-persist';

await storage.init();

export async function getStoredRoom(roomName: string) {
    await storage.init();
    return await storage.getItem(getRoomKey(roomName));
}

export async function setStoredRoom(roomName: string, data: Room) {
    await storage.init();
    return await storage.setItem(getRoomKey(roomName), data);
}

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
    await storage.init();
    console.time('cachify')
    const storedData = await storage.getItem(key);
    console.log(storedData)
    let returnData: T | null = null;
    options = options || {}
    if (storedData && (storedData.expiresAt === -1 || storedData.expiresAt > Date.now())) {
        returnData = storedData.data;
    }
    if (options.force || returnData === null) {
        const newData = await fallback();
        await storage.setItem(key, {
            expiresAt: options.timeout ? Date.now() + options.timeout : -1,
            data: newData
        });
        returnData = newData;
    }
    console.timeEnd('cachify')
    return returnData as T;
}