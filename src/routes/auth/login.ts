//  Login endpoint
import type { RequestHandler } from '@sveltejs/kit';
import { v4 } from 'uuid';
import { dev } from '$app/env';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Url = 'https://dev-eehvhdp2.eu.auth0.com/authorize';
// TODO: rethink scope
const scope = 'openid name picture profile email https://hasura.io/jwt/claims';
const audience = 'https://dev-eehvhdp2.eu.auth0.com/api/v2/';

export const get: RequestHandler = (request) => {
	const sessionId = v4();

	// TODO: set domain in .env + auth0
	const redirectUri = dev
		? `${request.url.origin}/auth/callback/`
		: `${import.meta.VITE_VERCEL_URL}/auth/callback/`;

	const query = new URLSearchParams({
		response_type: 'code',
		client_id: clientId,
		redirect_uri: redirectUri,
		scope,
		state: sessionId,
		audience,
	});
	const url = `${auth0Url}?${query.toString()}`;
	return {
		status: 302,
		headers: {
			location: url
		},
	};
};
