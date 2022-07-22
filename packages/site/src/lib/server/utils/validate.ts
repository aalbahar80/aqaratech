import { environment } from '$environment';
import { createLocalJWKSet, jwtVerify } from 'jose';

const { authConfig } = environment;

export const validateToken = async (
	token: string,
	tokenType: 'idToken' | 'accessToken' = 'idToken',
) => {
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
