//  Endpoint for redirection from GitHub after authorization...
import type { RequestHandler } from '@sveltejs/kit';

const tokenURL = 'https://dev-eehvhdp2.eu.auth0.com/oauth/token';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
const secret = import.meta.env.VITE_AUTH0_CLIENT_SECRET;

async function getTokens(code: string) {
	try {
		const res = await fetch(tokenURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				grant_type: 'authorization_code',
				client_id: clientId,
				client_secret: secret,
				code,
				redirect_uri: redirectUri,
			}),
		});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await res.json();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export const get: RequestHandler = async (req) => {
	try {
		const code = req.url.searchParams.get('code');

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const tokens = await getTokens(code);

		req.locals.user = tokens.id_token;
		req.locals.hasura = tokens.access_token; 

		return {
			status: 302,
			headers: {
				location: '/',
			},
		};
	} catch (e) {
		console.error(e);
		throw e;
	}
};
