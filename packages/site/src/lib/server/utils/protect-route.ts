import { LOGIN } from '$lib/constants/routes';
import type { User } from '$lib/models/types/auth.type';
import { isAccessible } from '$lib/server/utils/accessibile-routes';
import { error, redirect } from '@sveltejs/kit';

export const protectRoute = ({
	isAuthenticated,
	pathname,
	user,
}: {
	isAuthenticated: boolean;
	pathname: string;
	user?: User;
}) => {
	const publicUrl = ['/'].includes(pathname);
	const canAccess =
		publicUrl || (isAuthenticated && user && isAccessible({ user, pathname }));

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
		throw error(403, 'Forbidden');
	}
};
