import { LOGIN } from '$lib/constants/routes';
import type { User } from '$lib/models/types/auth.type';
import { isAccessible } from '$lib/server/utils/accessibile-routes';
import { error, redirect } from '@sveltejs/kit';

export const protectRoute = ({
	isAuthenticated,
	pathname,
	user,
	isAqaratechStaff,
}: {
	isAuthenticated: boolean;
	pathname: string;
	user?: User;
	isAqaratechStaff: boolean;
}) => {
	const publicUrl = ['/', '/favicon.ico'].includes(pathname);
	// As things stand, this check only runs server-side.
	// Not applicable when client-side routing is used.
	const canAccess =
		publicUrl ||
		(isAuthenticated && isAccessible({ user, pathname, isAqaratechStaff }));

	if (canAccess) {
		return;
	} else if (!isAuthenticated) {
		// Unauthenticated user
		console.debug(
			`[PROTECT-ROUTE] Unauthenticated user - Redirecting from ${pathname} to ${LOGIN}`,
		);
		// https://kit.svelte.dev/docs/load#redirects
		throw redirect(307, LOGIN);
	} else {
		console.debug(`[PROTECT-ROUTE] Forbidden`);
		throw error(403, {
			message: 'Forbidden',
			code: '403',
		});
	}
};
