import { LOGIN } from '$lib/constants/routes';
import { Cookie } from '@self/utils';

import type { Handle } from '@sveltejs/kit';

type SKEvent = Parameters<Handle>[0]['event'];

/**
 * Most likely the token has expired. Delete the cookies and redirect to login.
 *
 * TODO: make sure both tokens have same expiry. If they don't, we need to also check the access token.
 */
export const handleInvalidToken = (event: SKEvent) => {
	const clearCookie = (name: string) =>
		event.cookies.serialize(name, '', {
			maxAge: 0,
			path: '/',
		});

	// prepare the response headers
	const headers = new Headers();

	// clear cookies
	const cookieNames = [Cookie.idToken, Cookie.accessToken, Cookie.role];

	for (const name of cookieNames) {
		headers.append('Set-Cookie', clearCookie(name));
	}

	// redirect to login
	headers.append('Location', LOGIN);

	return new Response(undefined, {
		status: 302,
		headers,
	});
};
