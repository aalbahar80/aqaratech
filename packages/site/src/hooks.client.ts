import * as Sentry from '@sentry/sveltekit';

import type { HandleClientError } from '@sveltejs/kit';

import { sentryConfig } from '$lib/environment/sentry.config';

Sentry.init({
	dsn: 'https://16f4a4de6ab74e6e817b44cfd87b723d@o1210217.ingest.sentry.io/4505194893803520',
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()],
	...sentryConfig,
});

const customHandleError: HandleClientError = ({ error }) => {
	console.log({ error });
};

export const handleError = Sentry.handleErrorWithSentry(customHandleError);
