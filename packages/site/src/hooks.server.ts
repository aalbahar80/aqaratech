import * as Sentry from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

import { handleAuth } from './hooks/auth';
import { handleLocale } from './hooks/locale';
import { handleLog } from './hooks/log';
import { handleMisc } from './hooks/misc';

import type { HandleFetch, HandleServerError } from '@sveltejs/kit';

import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { sentryConfig } from '$lib/environment/sentry.config';
import { errorLogger } from '$lib/server/logger/error-logger';
import { logConfig } from '$lib/server/logger/startup';

Sentry.init({
	dsn: 'https://16f4a4de6ab74e6e817b44cfd87b723d@o1210217.ingest.sentry.io/4505194893803520',
	...sentryConfig,
});

logConfig();

export const handle = sequence(
	Sentry.sentryHandle(),
	handleLog,
	handleMisc,
	handleLocale,
	handleAuth,
);

const customHandleError = (({ error, event }) => {
	// discard map file errors
	if (event.url.pathname.endsWith('js.map')) {
		return;
	}

	console.log(error);

	errorLogger(error); // send to logtail at the end only

	if (error instanceof ResponseError) {
		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	}

	return;
}) satisfies HandleServerError;

export const handleError = Sentry.handleErrorWithSentry(customHandleError);

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
