import { config } from '$lib/services/auth/config';
import type { RequestHandler } from '@sveltejs/kit';
import { v4 } from 'uuid';

export const get: RequestHandler = () => {
	const sessionId = v4();

	const query = new URLSearchParams({
		response_type: 'code',
		client_id: config.clientId,
		redirect_uri: config.redirectUri,
		scope: config.scope,
		state: sessionId,
		audience: config.audience,
	});
	const url = `${config.authorizationUrl}?${decodeURIComponent(
		query.toString(),
	)}`;
	return {
		status: 302,
		headers: {
			location: url,
		},
	};
};
