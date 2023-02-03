import * as Sentry from '@sentry/node';
import { sequence } from '@sveltejs/kit/hooks';

import { handleAuth } from './hooks/auth';
import { handleLocale } from './hooks/locale';
import { handleLog } from './hooks/log';
import { handleSentry } from './hooks/sentry';

import type { HandleFetch, HandleServerError } from '@sveltejs/kit';

import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { errorLogger } from '$lib/server/logger/error-logger';
import { logConfig } from '$lib/server/logger/startup';
import { extractRequestInfo, getSentryUser } from '$lib/utils/sentry/common';
import { isNotFoundError } from '$lib/utils/sentry/redirect';

logConfig();

export const handle = sequence(
	handleLog,
	handleSentry,
	handleLocale,
	handleAuth,
);

export const handleError = (({ error, event }) => {
	// discard map file errors
	if (event.url.pathname.endsWith('js.map')) {
		return;
	}

	console.log(error);

	const info = extractRequestInfo(event);
	const user = getSentryUser(event.locals.user);

	console.debug({ info, user });

	if (isNotFoundError(error, event)) {
		// Most 404's are from random bots, but some may be legit.
		// So we log them to Sentry as 'info' instead of 'error'.
		// Alternate solution: https://github.com/sveltejs/kit/issues/6774#issuecomment-1246090470
		Sentry.captureEvent({
			level: 'info',
			message: 'NotFoundError (404) - HandleServerError',
			tags: {
				status: error.status,
				location: error.location,
				redirectFrom: event.url.href,
			},
			request: info,
		});
		return;
	}

	Sentry.captureException(error, {
		user,
	});

	errorLogger(error); // send to logtail at the end only

	if (error instanceof ResponseError) {
		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	}

	return;
}) satisfies HandleServerError;

export const handleFetch = (async ({ event, request, fetch }) => {
	// Runs when a load uses `fetch()` on the server
	const publicUrl = environment.PUBLIC_API_URL;
	const localUrl = environment.PUBLIC_API_URL_LOCAL;

	// Bypass the public internet when calling our backend from sveltekit server
	if (publicUrl && localUrl && request.url.startsWith(publicUrl)) {
		request = new Request(request.url.replace(publicUrl, localUrl), request);
	}

	// Include cookies to any server-side fetch request to the backend
	// These happend either in load functions or in the handle hook (when calling getUser)
	// https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
	if (request.url.startsWith(publicUrl) || request.url.startsWith(localUrl)) {
		const cookie = event.request.headers.get('cookie');
		if (cookie) {
			request.headers.set('cookie', cookie);
		}
	}

	return await fetch(request);
}) satisfies HandleFetch;
