import { environment } from '$lib/environment';
import { authConfig } from '$lib/environment/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = (req) => {
	//  Sets the user equal to null (local sign out)
	req.locals.user = undefined;
	req.locals.accessToken = undefined;
	req.locals.idToken = undefined;
	req.locals.xRoleId = undefined;

	// redirect to auth0 logout (global sign out)
	const BASE_URL = `${authConfig.AUTH0_DOMAIN}/v2/logout`;
	const clientId = authConfig.AUTH0_CLIENT_ID;
	const redirectUrl = environment.PUBLIC_SITE_URL || `${req.url.origin}`;
	const query = new URLSearchParams({
		client_id: clientId,
		returnTo: redirectUrl,
	});

	const logoutUrl = `${BASE_URL}?${query.toString()}`;

	return new Response(undefined, {
		status: 302,
		headers: {
			location: logoutUrl,
		},
	});
};
