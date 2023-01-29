import type { BrowserContext } from '@playwright/test';

/** Give a context and a cookie name, return the cookie object */
export const getCookie = async ({
	context,
	cookieName,
}: {
	context: BrowserContext;
	cookieName: string;
}) => {
	const cookies = await context.cookies();

	const cookie = cookies.find((cookie) => cookie.name === cookieName);

	return cookie;
};
