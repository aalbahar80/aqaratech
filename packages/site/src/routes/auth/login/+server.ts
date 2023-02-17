import type { RequestHandler } from '@sveltejs/kit';

import { DESTINATION } from '$lib/constants/misc';
import { authConfig } from '$lib/server/config/auth';
import { logger } from '$lib/server/logger';

export const GET: RequestHandler = ({ url, locals }) => {
	const redirect = new URL(authConfig.AUTH0_REDIRECT_URI);

	if (locals.user) {
		logger.log({
			level: 'debug',
			message:
				'User is already logged in. Intercepting call to /auth/login. Redirecting to /concierge.',
		});

		// If the user is already logged in, don't redirect them to the login page.
		return new Response(undefined, {
			status: 302,
			headers: {
				location: '/concierge',
			},
		});
	}

	// Preserve destination if it exists. We'll use it in the callback
	// to redirect the user to the page they were trying to access.
	const destination = url.searchParams.get(DESTINATION);

	if (destination) {
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
