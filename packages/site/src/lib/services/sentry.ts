import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

export const init = () => {
	Sentry.init({
		dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
		integrations: [new BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
};
