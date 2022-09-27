import { decodeJwt } from 'jose';

interface TokenReq {
	name: 'accessToken' | 'idToken';
	domain: string | undefined;
}

export const getToken = async ({ name, domain }: TokenReq) => {
	const cookies = await getCookies();

	const token = cookies.find((c) => c.name === name);

	if (!token) {
		throw new Error('No access token found');
	}

	// check cookies for expiration
	if (hasExpired(token.expires) || hasJWTExpired(token.value)) {
		throw new Error(`${name} has expired`);
	}

	// check domain
	if (!domain || token.domain !== new URL(domain).hostname) {
		throw new Error(`Domain mismatch: ${token.domain} !== ${domain || ''}`);
	}

	return token.value;
};

const getCookies = async () => {
	const cookies = (await import('../storageState.json')).cookies;
	return cookies;
};

const hasExpired = (exp: number) => exp < Date.now() / 1000;

const hasJWTExpired = (token: string) => {
	const payload = decodeJwt(token);
	return !payload.exp || hasExpired(payload?.exp);
};
