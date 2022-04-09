const domain = 'dev-eehvhdp2.eu.auth0.com';
const callbackPath = '/api/auth/callback';

interface Auth0AccessToken {
	iss: string;
	sub: string;
	aud: string[];
	exp: number;
	iat: number;
	azp: string;
	scope: string;
	// 'https://letand.be/roles': string[];
	roles: string[];
}

let redirectUri = '';
if (process.env.VERCEL) {
	redirectUri = `${import.meta.env.VITE_TARGET_URL}${callbackPath}`;
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

export const parseAccessToken = (accessToken: string): Auth0AccessToken => {
	const encodedJwt = accessToken.split('.')[1];
	if (!encodedJwt) {
		console.warn('Invalid token');
		throw new Error('Invalid token');
	}
	const decodedJwt = JSON.parse(
		Buffer.from(encodedJwt, 'base64').toString('ascii'),
	);
	// unpack decodedJwt into Auth0AccessToken object
	return {
		iss: decodedJwt.iss,
		sub: decodedJwt.sub,
		aud: decodedJwt.aud,
		exp: decodedJwt.exp,
		iat: decodedJwt.iat,
		azp: decodedJwt.azp,
		scope: decodedJwt.scope,
		roles: decodedJwt['https://letand.be/roles'],
	};
};
