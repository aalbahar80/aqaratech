import { environment } from '$environment';
import { createLocalJWKSet, jwtVerify } from 'jose';

const { authConfig } = environment;

export const validateAccessToken = async (
	token: string,
	tokenType: 'idToken' | 'accessToken' = 'accessToken',
) => {
	// const JWKS = jose.createRemoteJWKSet(
	// 	new URL(`${authConfig.AUTH0_DOMAIN}/.well-known/jwks.json`),
	// );

	// TODO use .env
	const JWKS = createLocalJWKSet(authConfig.JWKS);
	const audience =
		tokenType === 'accessToken'
			? authConfig.AUTH0_API_AUDIENCE
			: authConfig.AUTH0_CLIENT_ID;
	const { payload } = await jwtVerify(token, JWKS, {
		audience,
		issuer: `${authConfig.AUTH0_DOMAIN}/`,
		algorithms: ['RS256'],
	});
	return payload;
};
