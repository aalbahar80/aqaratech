import { authConfig } from '$lib/environment/auth';
import { createLocalJWKSet, jwtVerify } from 'jose';

type TokenType = 'idToken' | 'accessToken';
/**
 * Validates idtoken and returns payload.
 */
export const validateToken = async (token: string, tokenType: TokenType) => {
	const JWKS = createLocalJWKSet(authConfig.JWKS);

	console.debug(`Validating ${tokenType}...`);

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
