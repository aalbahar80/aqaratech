//  Logout endpoint

import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = (req) => {
	//  Sets the user equal to null (local sign out)
	req.locals.user = null;
	req.locals.hasura = null;

	// redirect to auth0 logout (global sign out)
	const BASE_URL = 'https://dev-eehvhdp2.eu.auth0.com/v2/logout';
	const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
	const redirectUrl = `${req.url.origin}`;
	const query = new URLSearchParams({
		client_id: clientId,
		returnTo: redirectUrl,
	});

	const logoutUrl = `${BASE_URL}?${query.toString()}`;

	return {
		status: 302,
		headers: {
			location: logoutUrl,
		},
	};
};
