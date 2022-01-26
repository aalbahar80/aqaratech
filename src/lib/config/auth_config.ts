import { f } from '$lib/config/colorLog';
import { logger } from '$lib/config/logger';

const config = {
	domain: 'dev-eehvhdp2.eu.auth0.com',
	clientId: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
	// clientId: 'OhiONzkpz4sLZTpEguyjEuFVKPqY9kZ9',
};

export const getRedirectUri = (url: URL) => {
	// const redirectUri = `${request.url.origin}/auth/callback/`;
	const prefix = '/auth/callback';
	let base = url.origin;

	if (process.env.VERCEL && process.env.VERCEL_URL) {
		// base = 'https://svelte-14dec21.vercel.app';
		base = process.env.VERCEL_URL;
		// base = `${url.protocol}${'//svelte-14dec21.vercel.app'}`;
	}
	logger.info(f('auth_config.ts', 25, { base }));

	const redirectUri = `${base}${prefix}`;
	logger.info(f('auth_config.ts', 22, { redirectUri }));

	return redirectUri;
};

export default config;
