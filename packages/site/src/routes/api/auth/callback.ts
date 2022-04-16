import type { RequestHandler } from '@sveltejs/kit';
import { config, parseUser } from '$lib/services/auth/config';
import { getAuthz } from '$lib/server/utils';

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4dfd78d7d9a3fcd21a2eaf861756f6904881dbfa/types/auth0/index.d.ts#L691
export interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string | undefined;
	id_token?: string | undefined;
	refresh_token?: string | undefined;
}

async function getTokens(code: string, redirectUri: string) {
	try {
		const body = JSON.stringify({
			grant_type: 'authorization_code',
			client_id: config.clientId,
			client_secret: config.clientSecret,
			code,
			redirect_uri: redirectUri,
		});

		const res = await fetch(config.accessTokenUrl, {
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

		const redirectUri = config.redirectUri;

		const tokens = await getTokens(code, redirectUri);

		req.locals.accessToken = tokens.access_token;
		req.locals.idToken = tokens.id_token;
		req.locals.user = parseUser(tokens.id_token);

		let location = '/';
		const authz = await getAuthz(req.locals.idToken);
		if (authz?.isTenant) {
			location = `/portal/tenant/${authz.id}`;
		} else if (authz?.isOwner) {
			location = `/portal/owner/${authz.id}`;
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
