import type { Cookie } from '@self/utils';
import { decodeJwt } from 'jose';

interface TokenReq {
	name: Cookie.idToken | Cookie.accessToken;
	domain: string | undefined;
}

export const getToken = async (
	{ name, domain }: TokenReq,
	filename: string,
) => {
	const cookies = await getCookies(filename);

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

const getCookies = async (filename: string) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const cookies = (await import(`../storage-state/${filename}`))
		.cookies as Cookies;

	return cookies;
};

const hasExpired = (exp: number) => exp < Date.now() / 1000;

const hasJWTExpired = (token: string) => {
	const payload = decodeJwt(token);
	return !payload.exp || hasExpired(payload?.exp);
};

type Cookies = typeof import('../storage-state/org-admin.json')['cookies'];
