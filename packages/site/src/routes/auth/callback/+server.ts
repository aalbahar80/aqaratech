import { Cookie } from '@self/utils';

import { MAX_AGE } from '$lib/constants/misc';
import { authConfig } from '$lib/server/config/auth';
import { errorLogger } from '$lib/server/logger/error-logger';

import type { RequestHandler } from '@sveltejs/kit';

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4dfd78d7d9a3fcd21a2eaf861756f6904881dbfa/types/auth0/index.d.ts#L691
export interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string | undefined;
	id_token?: string | undefined;
	refresh_token?: string | undefined;
}

async function getTokens(code: string) {
	try {
		const body = JSON.stringify({
			grant_type: 'authorization_code',
			client_id: authConfig.AUTH0_CLIENT_ID,
			client_secret: authConfig.AUTH0_CLIENT_SECRET,
			code,
			redirect_uri: authConfig.AUTH0_REDIRECT_URI,
		});

		const res = await fetch(`${authConfig.AUTH0_DOMAIN}/oauth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		});

		const data: TokenResponse = (await res.json()) as TokenResponse;
		return data;
	} catch (e) {
		errorLogger(e);

		throw e;
	}
}

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');

	if (!code) throw new Error('Unable to get code from URL');

	const tokens = await getTokens(code);

	if (!tokens.id_token || !tokens.access_token) {
		throw new Error('Unable to get tokens from Auth0');
	}

	// set cookies. tokens will be validated in hooks.handle
	cookies.set(Cookie.idToken, tokens.id_token, {
		path: '/',
		maxAge: MAX_AGE,
	});

	cookies.set(Cookie.accessToken, tokens.access_token, {
		path: '/',
		maxAge: MAX_AGE,
	});

	// Redirect to `/concierge`.
	const location = '/concierge';

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
