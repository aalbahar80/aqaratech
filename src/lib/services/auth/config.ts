const domain = 'dev-eehvhdp2.eu.auth0.com';
const callbackPath = '/api/auth/callback';

let redirectUri = '';
if (process.env.VERCEL && process.env.VERCEL_URL) {
	redirectUri = `https://${process.env.VERCEL_URL}${callbackPath}`;
} else {
	redirectUri = `http://localhost:3000${callbackPath}`;
}

export const config = {
	domain,
	accessTokenUrl: `https://${domain}/oauth/token`,
	// https://auth0.com/docs/authenticate/login/auth0-universal-login/new-experience#signup
	authorizationUrl: `https://${domain}/authorize`,
	profileUrl: `https://${domain}/userinfo`,
	clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
	clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
	scope: 'openid profile email',
	audience: 'letand.be/api',
	redirectUri,
};

export const parseUser = (
	idToken: string | undefined,
): Auth0Profile | undefined => {
	const encodedJwt = idToken?.split('.')[1];
	if (!encodedJwt) {
		console.warn('Invalid token');
		return undefined;
	}
	const decodedJwt = JSON.parse(
		Buffer.from(encodedJwt, 'base64').toString('ascii'),
	);
	return {
		sub: decodedJwt.sub,
		name: decodedJwt.name,
		picture: decodedJwt.picture,
		email: decodedJwt.email,
		updated_at: decodedJwt.updated_at,
	};
};
