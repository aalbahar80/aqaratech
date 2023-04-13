import path from 'node:path';

import { decodeJwt } from 'jose';

import type { Cookie } from '@self/utils';

import { globalStoragePath } from './global-storage-path';

import type { BrowserContextOptions } from '@playwright/test';

interface TokenReq {
	name: Cookie.idToken | Cookie.accessToken;
	domain: string | undefined;
}

export const getToken = async (
	{ name, domain }: TokenReq,
	filename: string,
) => {
	const cookies = await getCookies(filename);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
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
		throw new Error(`Domain mismatch: ${token.domain} !== ${domain ?? ''}`);
	}

	return token.value;
};

const getCookies = async (filename: string) => {
	const file = path.join(globalStoragePath, filename);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const cookies = (await import(file)).cookies as Cookies;

	return cookies;
};

const hasExpired = (exp: number) => exp < Date.now() / 1000;

const hasJWTExpired = (token: string) => {
	const payload = decodeJwt(token);
	return !payload.exp || hasExpired(payload.exp);
};

type Cookies = NonNullable<
	Exclude<BrowserContextOptions['storageState'], string>
>['cookies'];
