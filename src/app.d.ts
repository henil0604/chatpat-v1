// See https://kit.svelte.dev/docs/types#app

import type { Settings, Wallet } from "@prisma/client"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Session {
			user?: {
				username?: string | null,
				name?: string | null,
				email?: string | null,
				image?: string | null,
				id?: string | null,
				settings?: Settings,
				wallet?: Wallet,
			}
			expires: string
		}
	}

}

export { };
