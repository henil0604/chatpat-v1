/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    const session = await locals.getSession();
    return {
        session: session || null,
        user: session?.user || null
    }
}