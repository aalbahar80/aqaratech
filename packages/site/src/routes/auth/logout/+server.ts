import { environment } from '$lib/environment';
import { authConfig } from '$lib/server/config/auth';
import { Cookie } from '@self/utils';

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies }) => {
	// clear cookies (local signout)

	// Why does this not work?
	// cookies.delete(Cookie.idToken);
	// cookies.delete(Cookie.accessToken);

	// Manually set cookies to expire in the past
	cookies.set(Cookie.idToken, '', {
		maxAge: 0,
		path: '/',
	});

	cookies.set(Cookie.accessToken, '', {
		maxAge: 0,
		path: '/',
	});

	cookies.set(Cookie.role, '', {
		maxAge: 0,
		path: '/',
	});

	// redirect to auth0 logout (global signout)
	const BASE_URL = `${authConfig.AUTH0_DOMAIN}/v2/logout`;
	const clientId = authConfig.AUTH0_CLIENT_ID;
	const redirectUrl = environment.PUBLIC_SITE_URL;
	const query = new URLSearchParams({
		client_id: clientId,
		returnTo: redirectUrl,
	});

	const location = `${BASE_URL}?${query.toString()}`;

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
