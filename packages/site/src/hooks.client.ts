import * as Sentry from '@sentry/sveltekit';

import type { HandleClientError } from '@sveltejs/kit';

import { sentryConfig } from '$lib/environment/sentry.config';

Sentry.init({
	dsn: 'https://d386f6544b94f9e54961015e98dc0306@o4507250750128128.ingest.de.sentry.io/4507250766708816',
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()],
	...sentryConfig,
});

const customHandleError: HandleClientError = ({ error }) => {
	console.log({ error });
};

export const handleError = Sentry.handleErrorWithSentry(customHandleError);
