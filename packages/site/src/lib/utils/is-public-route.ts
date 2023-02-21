import type { LoadEvent } from '@sveltejs/kit/types';

/** Routes that require authentication. Generally, all declared routes
 * except for the home page.
 *
 * Does not include server-side routes such as /auth/* or /health.
 *
 * Does not include unknown routes such as /does-not-exist. This is
 * important to avoid redirecting bots & crawlers to the login page. */
export const isProtectedRoute = (route: LoadEvent['route']) => {
	const protectedRoutes = ['/organizations', '/portal', '/users', '/welcome'];

	const isProtected = protectedRoutes.some((protectedRoute) =>
		route.id?.includes(protectedRoute),
	);

	return isProtected;
};
