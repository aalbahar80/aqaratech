import { environment } from '$environment';
import { getAuthz } from '$lib/server/utils';
import type { RequestHandler } from '@sveltejs/kit';

const { authConfig } = environment;

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
		console.log({ body }, 'callback.ts ~ 26');

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

export const get: RequestHandler = async (req) => {
	try {
		const code = req.url.searchParams.get('code');
		if (!code) throw new Error('Unable to get code from URL');

		console.log({ code }, 'callback.ts ~ 50');
		const tokens = await getTokens(code);

		console.log({ tokens }, 'callback.ts ~ 52');
		req.locals.accessToken = tokens.access_token;
		req.locals.idToken = tokens.id_token || '';
		// req.locals.user = await validateAccessToken(tokens.id_token, 'idToken');

		let location = '/';
		const authz = await getAuthz(req.locals.idToken, 'idToken');
		if (authz?.isTenant) {
			location = `/portal/tenant/${authz.id}`;
		} else if (authz?.isOwner) {
			location = `/clients/${authz.id}/dashboard`;
		}

		return {
			status: 302,
			headers: {
				location,
			},
		};
	} catch (e) {
		console.error(e);
		throw e;
	}
};
