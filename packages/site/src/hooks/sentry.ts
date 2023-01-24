import * as Sentry from '@sentry/node';
import '@sentry/tracing';

import type { Handle } from '@sveltejs/kit';

import { sentryConfig } from '$lib/environment/sentry.config';
import { addTraceToHead } from '$lib/utils/sentry/common';

Sentry.init({
	...sentryConfig,
	dsn: 'https://63374363bb0a4d5194497f0212c0b94f@o1210217.ingest.sentry.io/6735909',
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http(),
	],
});

Sentry.setTag('svelteKit', 'server');

export const handleSentry = (async ({ event, resolve }) => {
	const transaction = Sentry.startTransaction({
		op: 'http.server',
		// op: 'middleware.handle',
		name: event.request.method + ' ' + event.request.url,
		description: 'sveltekit.handle',
	});

	Sentry.configureScope((scope) => {
		scope.setSpan(transaction);
	});

	const spanResolve = transaction.startChild({
		op: 'http.server',
		description: 'handle.resolve',
	});

	const response = await resolve(event, {
		transformPageChunk({ html }) {
			return addTraceToHead({ html, span: spanResolve });
		},
	});

	spanResolve.finish();

	// Close the Sentry transaction
	transaction.finish();

	return response;
}) satisfies Handle;
