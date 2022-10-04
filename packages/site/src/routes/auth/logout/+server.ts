import { environment } from '$lib/environment';
import { authConfig } from '$lib/environment/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies }) => {
	// clear cookies (local signout)

	// Why does this not work?
	// cookies.delete('idToken');
	// cookies.delete('accessToken');

	// Manually set cookies to expire in the past
	cookies.set('idToken', '', {
		maxAge: 0,
		path: '/',
	});

	cookies.set('accessToken', '', {
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
