import { authConfig } from '$lib/environment/auth';
import { createLocalJWKSet, jwtVerify } from 'jose';

/**
 * Validates idtoken and returns payload.
 */
export const validateToken = async (token: string) => {
	const JWKS = createLocalJWKSet(authConfig.JWKS);
	const { payload } = await jwtVerify(token, JWKS, {
		audience: authConfig.AUTH0_CLIENT_ID,
		issuer: `${authConfig.AUTH0_DOMAIN}/`,
		algorithms: ['RS256'],
	});
	return payload;
};
