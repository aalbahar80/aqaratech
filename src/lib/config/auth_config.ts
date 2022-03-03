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
		// base = 'https://svelte-14dec21.vercel.app';
		if (typeof import.meta.env.VITE_TARGET_URL === 'string') {
			base = import.meta.env.VITE_TARGET_URL;
		} else {
			const err = new Error('VITE_TARGET_URL is not defined');
			console.error(err);
			throw err;
		}
	}
	console.log({ base }, 'auth_config.ts ~ 26');

	const redirectUri = `${base}${prefix}`;
	console.log({ redirectUri }, 'auth_config.ts ~ 30');

	return redirectUri;
};

export default config;
