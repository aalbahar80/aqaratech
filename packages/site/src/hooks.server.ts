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
	dsn: 'https://d386f6544b94f9e54961015e98dc0306@o4507250750128128.ingest.de.sentry.io/4507250766708816',
	beforeSend(event, hint) {
		if (hint.originalException instanceof ResponseError) {
			const response = hint.originalException.response;
			// Sentry only captures basic info for openapi's ResponseError,
			// so we manually add extra info here. This is about the nested
			// error reponse received by the sveltekit server.
			if (event.tags) {
				event.tags['status'] = response.status;
			}

			if (event.extra) {
				event.extra['api_response'] = {
					status: response.status,
					statusText: response.statusText,
					url: response.url,
				};
			}
		}
		return event;
	},
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

const customHandleError = (({ error }) => {
	// @ts-expect-error this conforms to the default implementation (including this ts-expect-error)
	// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
	console.error(error && error.stack);

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
