import { dev } from '$app/env';

const config = {
	domain: 'dev-eehvhdp2.eu.auth0.com',
	clientId: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
	// clientId: 'OhiONzkpz4sLZTpEguyjEuFVKPqY9kZ9',
};

export const getRedirectUri = (origin: string) => {
	// const redirectUri = `${request.url.origin}/auth/callback/`;
	const prefix = '/auth/callback/';
	let base = origin;

	if (process.env.VERCEL) {
		base = 'https://svelte-14dec21.vercel.app';
	}

	return `${base}${prefix}`;
};

export default config;
