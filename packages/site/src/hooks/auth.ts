import * as Sentry from '@sentry/sveltekit';

import { Cookie } from '@self/utils';

import type { Handle } from '@sveltejs/kit';

import { MAX_AGE } from '$lib/constants/misc';
import { COOKIE_OPTIONS } from '$lib/server/config/auth/cookie-options';
import { logger } from '$lib/server/logger';
import { getUser } from '$lib/server/utils/get-user';
import { handleInvalidToken } from '$lib/server/utils/handle-invalid-token';
import { validateToken } from '$lib/server/utils/validate';
import { getSentryUser } from '$lib/utils/sentry';

export const handleAuth = (async ({ event, resolve }) => {
	const idToken = event.cookies.get(Cookie.idToken);
	const accessToken = event.cookies.get(Cookie.accessToken);
	const selectedRoleId = event.cookies.get(Cookie.role);

	// consume idToken and set user. Any redirects should be handled by layout/page load functions.
	if (idToken && accessToken) {
		// validate tokens
		try {
			await validateToken(idToken, Cookie.idToken);
			await validateToken(accessToken, Cookie.accessToken);
		} catch (error) {
			logger.log({
				level: 'debug',
				message: 'Invalid token',
			});

			return handleInvalidToken(event);
		}

		// get the user
		const user = await getUser({ event, selectedRoleId });

		// set the role cookie if it's not yet set
		if (!selectedRoleId && user.role) {
			event.cookies.set(Cookie.role, user.role.id, {
				path: '/',
				maxAge: MAX_AGE,
				...COOKIE_OPTIONS,
			});
		}

		// set user in locals
		event.locals.user = user;

		Sentry.setUser(getSentryUser(user));
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;
