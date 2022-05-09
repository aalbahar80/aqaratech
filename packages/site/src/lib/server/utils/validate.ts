import { environment } from '$environ';
import { createLocalJWKSet, jwtVerify } from 'jose';

const { authConfig } = environment;

export const validateAccessToken = async (
	token: string,
	tokenType: 'idToken' | 'accessToken' = 'accessToken',
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
