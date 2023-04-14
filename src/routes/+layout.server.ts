import { redirect } from "@sveltejs/kit";

export const ssr = false;

function isProtectedRoute(url: string): boolean {
  const ProtectedRoutes = [
    "/preregister",
    "/dashboard"
  ]

  return ProtectedRoutes.some(route => {
    if (route === '*') {
      // Wildcard match - all routes are protected
      return true;
    } else if (route.endsWith('*')) {
      // Prefix wildcard match - match all routes that start with the prefix
      const prefix = route.slice(0, -1);
      return url.startsWith(prefix);
    } else if (route.startsWith('*')) {
      // Suffix wildcard match - match all routes that end with the suffix
      const suffix = route.slice(1);
      return url.endsWith(suffix);
    } else {
      // Exact match
      return url === route;
    }
  });
}

/** @type {import('./$types').PageLoad} */
// @ts-ignore
export async function load({ locals, url }) {
  const session = await locals.getSession();

  if (url.pathname.startsWith("/login")) {
    return {};
  }

  if ((!session || !session?.user) && isProtectedRoute(url.pathname)) {
    console.log(`"${url.pathname}" matched, redirecting!`)
    const fromUrl = url.pathname + url.search;
    throw redirect(301, `/login?redirectTo=${fromUrl}`)
  }

  return {
    session: session || null,
    user: session?.user || null
  }
}
