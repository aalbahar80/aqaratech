import type { RequestHandler } from '@sveltejs/kit';

import { DESTINATION } from '$lib/constants/misc';
import { authConfig } from '$lib/server/config/auth';

export const GET: RequestHandler = ({ url }) => {
	const redirect = new URL(authConfig.AUTH0_REDIRECT_URI);

	// Preserve destination if it exists. We'll use it in the callback
	// to redirect the user to the page they were trying to access.
	const destination = url.searchParams.get(DESTINATION);

	if (destination) {
		// TODO: use withQuery
		redirect.searchParams.set(DESTINATION, destination);
	}

	const query = new URLSearchParams({
		response_type: 'code',
		client_id: authConfig.AUTH0_CLIENT_ID,
		redirect_uri: redirect.toString(),
		scope: 'openid profile email',
		state: crypto.randomUUID(),
		audience: authConfig.AUTH0_API_AUDIENCE,
	});

	// handle signup
	if (url.searchParams.get('screen_hint') === 'signup') {
		query.set('screen_hint', 'signup');
	}

	const location = `${authConfig.AUTH0_DOMAIN}/authorize?${decodeURIComponent(
		query.toString(),
	)}`;

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
