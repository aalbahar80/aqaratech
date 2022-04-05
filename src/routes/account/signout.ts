import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const get: RequestHandler = async ({ request, url }) => {
	// Redirect to auth0 logout (global sign out)
	const BASE_URL = 'https://dev-eehvhdp2.eu.auth0.com/v2/logout';
	const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
	const redirectUrl = `${url.origin}`;
	const query = new URLSearchParams({
		client_id: clientId,
		returnTo: redirectUrl,
	});
	const logoutUrl = `${BASE_URL}?${query.toString()}`;

	const headers = { Location: logoutUrl };

	// Workaround signOut issue in sk-auth/client. Check for auth cookie
	// and, if found, nullify its value and expire it.
	const cookies = request.headers.get('cookie');
	if (cookies && cookie.parse(cookies)['svelteauthjwt']) {
		headers['Set-Cookie'] = cookie.serialize('svelteauthjwt', '', {
			path: '/',
			httpOnly: true,
			expires: new Date('1970-01-01 00:00:00 UTC'),
		});
	}

	return {
		status: 302,
		headers,
	};
};
