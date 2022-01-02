//  Login endpoint
import type { RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/env';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Url = 'https://dev-eehvhdp2.eu.auth0.com/authorize';
const scope = 'openid name picture profile email hasura-28-dec https://hasura.io/jwt/claims';

export const get: RequestHandler = (request) => {
	const sessionId = '1234';
	
	// TODO: set domain in .env + auth0
	const redirectUri = dev
	? `${request.url.origin}/callback`
	: `${request.url.origin}/callback`;
	//  Redirect request to GitHub authentication endpoint with CLIENT_ID
	return {
		status: 302,
		headers: {
			location: `${auth0Url}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${sessionId}`,
		},
	};
};
