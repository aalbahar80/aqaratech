import { authConfig } from '$lib/environment/auth';
import { getUser } from '$lib/server/utils/get-user';
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

export const GET: RequestHandler = async ({ locals, url }) => {
	const code = url.searchParams.get('code');

	if (!code) throw new Error('Unable to get code from URL');

	const tokens = await getTokens(code);

	locals.accessToken = tokens.access_token;

	// TODO shouldn't add idToken to locals, instead extract user then discard it
	locals.idToken = tokens.id_token;

	// If user exists in db, we can use his accesstoken to get his profile
	const user = await getUser({ token: locals.accessToken });

	// TODO: differentiate between
	// 1. user doesn't exist in db
	// 2. backend not available

	// If user does not exist in db, redirect to welcome page
	const location = user?.role?.meta.home || '/welcome';

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
