import type { MaybePromise } from '$app/forms';
import { error } from '@sveltejs/kit';
import log from '@/utils/log';

export default async function validateInput<T>(schema: Zod.AnyZodObject, dataGrabber: any) {

    let requestData;
    try {
        requestData = await dataGrabber;
    } catch (e) {
        log(`[validateInput]`, e, 'error')
        throw error(400, "Bad Input");
    }

    const parsedData = await schema.safeParseAsync(requestData);

    if (!parsedData.success) {
        throw error(400, parsedData.error.message)
    }

    return parsedData.data as T;
}