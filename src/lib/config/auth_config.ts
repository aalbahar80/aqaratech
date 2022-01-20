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

	if (process.env.VERCEL) {
		base = 'https://svelte-14dec21.vercel.app';
		// base = `${url.protocol}${'//svelte-14dec21.vercel.app'}`;
	}
	logger.info('📜 auth_config.ts 18 base:', base);

	const redirectUri = `${base}${prefix}`;
	logger.info('📜 auth_config.ts 21 redirectUri:', redirectUri);

	return redirectUri;
};

export default config;
