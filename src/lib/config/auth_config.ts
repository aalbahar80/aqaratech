import { dev } from '$app/env';

const config = {
	domain: 'dev-eehvhdp2.eu.auth0.com',
	clientId: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
	// clientId: 'OhiONzkpz4sLZTpEguyjEuFVKPqY9kZ9',
};

export const getRedirectUri = (origin: string) => {
	// const redirectUri = `${request.url.origin}/auth/callback/`;
	const prefix = '/auth/callback/';
	let base = '';
	if (dev) {
		base = origin;
	} else if (process.env.VERCEL && process.env.VERCEL_URL) {
		base = process.env.VERCEL_URL;
	} else {
		base = 'https://svelte-14dec21.vercel.app';
	}
	console.log(
		'🚀 ~ file: auth_config.ts ~ line 23 ~ getRedirectUri ~ `${base}${prefix}`',
		`${base}${prefix}`,
	);
	return `${base}${prefix}`;
};

export default config;
