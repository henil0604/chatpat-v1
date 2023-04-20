import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    createRoom: async (event) => {
        const data = await event.request.formData();

        console.log(data);
        return {
            error: false
        }
    }
};