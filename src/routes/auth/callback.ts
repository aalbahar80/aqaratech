//  Endpoint for redirection from GitHub after authorization...
import type { RequestHandler } from '@sveltejs/kit';
import { getRedirectUri } from '$lib/config/auth_config';

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4dfd78d7d9a3fcd21a2eaf861756f6904881dbfa/types/auth0/index.d.ts#L691
interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string | undefined;
	id_token?: string | undefined;
	refresh_token?: string | undefined;
}

const tokenURL = 'https://dev-eehvhdp2.eu.auth0.com/oauth/token';

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const secret = import.meta.env.VITE_AUTH0_CLIENT_SECRET;

async function getTokens(code: string, redirectUri: string) {
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

		const data: TokenResponse = (await res.json()) as TokenResponse;
		console.log('🚀 ~ file: callback.ts ~ line 38 ~ getTokens ~ data', data);
		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export const get: RequestHandler<Locals> = async (req) => {
	// debugger;
	try {
		const code = req.url.searchParams.get('code');
		if (!code) throw new Error('Unable to get code from URL');

		const redirectUri = getRedirectUri(req.url);

		const tokens = await getTokens(code, redirectUri);

		req.locals.user = tokens.id_token || '';
		req.locals.hasura = tokens.access_token;

		return {
			status: 302,
			headers: {
				location: '/',
			},
		};
	} catch (e) {
		// TODO: create error page
		console.error(e);
		throw e;
	}
};
