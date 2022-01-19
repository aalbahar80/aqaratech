//  Login endpoint
import { getRedirectUri } from '$lib/config/auth_config';
import type { RequestHandler } from '@sveltejs/kit';
import { v4 } from 'uuid';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Url = 'https://dev-eehvhdp2.eu.auth0.com/authorize';
// TODO: rethink scope
const scope = 'openid name picture profile email https://hasura.io/jwt/claims';
const audience = 'https://dev-eehvhdp2.eu.auth0.com/api/v2/';

export const get: RequestHandler = (request) => {
	const sessionId = v4();

	const redirectUri = getRedirectUri(request.url);

	const query = new URLSearchParams({
		response_type: 'code',
		client_id: clientId,
		redirect_uri: redirectUri,
		scope,
		state: sessionId,
		audience,
	});
	const url = `${auth0Url}?${decodeURIComponent(query.toString())}`;
	console.log('redirecting to:');
	console.log('🚀 ~ file: login.ts ~ line 26 ~ url', url);
	return {
		status: 302,
		headers: {
			location: url,
		},
	};
};
