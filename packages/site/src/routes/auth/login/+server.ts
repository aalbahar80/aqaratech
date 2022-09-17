import { authConfig } from '$lib/environment/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const query = new URLSearchParams({
		response_type: 'code',
		client_id: authConfig.AUTH0_CLIENT_ID,
		redirect_uri: authConfig.AUTH0_REDIRECT_URI,
		scope: 'openid profile email',
		state: crypto.randomUUID(),
		audience: authConfig.AUTH0_API_AUDIENCE,
	});
	const url = `${authConfig.AUTH0_DOMAIN}/authorize?${decodeURIComponent(
		query.toString(),
	)}`;
	return new Response(undefined, {
		status: 302,
		headers: {
			location: url,
		},
	});
};
