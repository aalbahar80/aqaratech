import { authConfig } from '$lib/environment/auth';
import { validateToken } from '$lib/server/utils/validate';
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
		console.error(e);
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

	// validate idToken only. Access token is validated by backend.
	// TODO: validate both?
	// TODO: consider leaving token validation to hooks.handle instead?
	await validateToken(tokens.id_token);

	// set cookies
	const maxAge = 60 * 60 * 24 * 7;

	cookies.set('idToken', tokens.id_token, {
		path: '/',
		maxAge,
	});

	cookies.set('accessToken', tokens.access_token, {
		path: '/',
		maxAge,
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
