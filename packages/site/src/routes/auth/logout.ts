import type { RequestHandler } from '@sveltejs/kit';
import { environment } from '$environment';

const { authConfig } = environment;

export const get: RequestHandler = (req) => {
	//  Sets the user equal to null (local sign out)
	req.locals.user = undefined;
	req.locals.accessToken = '';
	req.locals.idToken = '';
  
  console.log('req', req)
  console.log('req.request.url', req.request.url)

	// redirect to auth0 logout (global sign out)
	const BASE_URL = `${authConfig.AUTH0_DOMAIN}/v2/logout`;
	const clientId = authConfig.AUTH0_CLIENT_ID;
  const redirectUrl = new URL(req.request.url).origin;
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
