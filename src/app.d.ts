// See https://kit.svelte.dev/docs/types#app

import type { DefaultSession, Session } from "@auth/core/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Session implements DefaultSession {
			user?: {
				name?: string | null
				email?: string | null
				image?: string | null,
				id?: string | null
			}
			expires: string
		}
	}
}

export { };
