import { environment } from '$environment';
import type { RequestHandler } from '@sveltejs/kit';
import { v4 } from 'uuid';

const { authConfig } = environment;

export const GET: RequestHandler = () => {
	const query = new URLSearchParams({
		response_type: 'code',
		client_id: authConfig.AUTH0_CLIENT_ID,
		redirect_uri: authConfig.AUTH0_REDIRECT_URI,
		scope: 'openid profile email',
		state: v4(),
		audience: authConfig.AUTH0_API_AUDIENCE,
	});
	const url = `${authConfig.AUTH0_DOMAIN}/authorize?${decodeURIComponent(
		query.toString(),
	)}`;
	return {
		status: 302,
		headers: {
			location: url,
		},
	};
};
