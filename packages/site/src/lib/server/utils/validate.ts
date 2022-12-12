import { createLocalJWKSet, jwtVerify } from 'jose';

import { Cookie } from '@self/utils';

import { authConfig } from '$lib/server/config/auth';
import { logger } from '$lib/server/logger';

type TokenType = Cookie.idToken | Cookie.accessToken;
/**
 * Validates idtoken and returns payload.
 */
export const validateToken = async (token: string, tokenType: TokenType) => {
	const JWKS = createLocalJWKSet(authConfig.JWKS);

	logger.log({
		level: 'debug',
		message: JSON.stringify({
			name: 'validateToken',
			tokenType,
		}),
	});

	const audience =
		tokenType === Cookie.accessToken
			? authConfig.AUTH0_API_AUDIENCE
			: authConfig.AUTH0_CLIENT_ID;

	const { payload } = await jwtVerify(token, JWKS, {
		audience,
		issuer: `${authConfig.AUTH0_DOMAIN}/`,
		algorithms: ['RS256'],
	});

	return payload;
};
