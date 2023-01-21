import * as Sentry from '@sentry/node';

import type { ValidatedUserDto } from '$api/openapi';
import type { RequestEvent } from '@sveltejs/kit';

import { environment } from '$aqenvironment';
import { logger } from '$lib/server/logger';

export const getProfile = async (event: RequestEvent) => {
	// Sentry
	const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();
	const span = transaction?.startChild({
		op: 'getProfile',
	});

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (span) {
		headers['sentry-trace'] = `${span.toTraceparent()}`;
	} else {
		logger.log({
			level: 'debug',
			message: 'Could not get span for getProfile',
		});
	}

	// Either get the user or return undefined.
	// construct url
	const url = new URL(`${environment.PUBLIC_API_URL_LOCAL}/users/me`);

	// fetch user
	// sveltekit's `fetch` allows us to make a credentiale request server-side. The accessToken is stored in a cookie.
	// try {
	const res = await event.fetch(url.toString(), {
		headers,
		credentials: 'include',
	});

	if (!res.ok) {
		// It's important to check for res.ok because fetch will not throw an error.
		// This means the backend is up. But there was an issue with the request.

		logger.log({
			level: 'warn',
			message: JSON.stringify({
				status: res.status,
				statusText: res.statusText,
				url: res.url,
				message: 'Backend responded with an error when fetching user',
			}),
		});

		// Avoid using error helper to invoke error hook
		throw new Error('Backend responded with an error when fetching user', {
			cause: res,
		});
	}

	const data = (await res.json()) as ValidatedUserDto;

	return data;
};
