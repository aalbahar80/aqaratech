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

	const redirectUri = `${base}${prefix}`;
	// const redirectUri = 'https://localhost:3000/auth/callback';
	console.log(
		'🚀 ~ file: auth_config.ts ~ line 17 ~ getRedirectUri ~ base',
		base,
	);
	console.log(
		'🚀 ~ file: auth_config.ts ~ line 18 ~ getRedirectUri ~ result',
		redirectUri,
	);

	return redirectUri;
};

export default config;
