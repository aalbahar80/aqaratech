import { environment } from '$lib/environment';
import { getSentryConfig } from '@self/utils';

export const sentryConfig = getSentryConfig({
	PUBLIC_AQ_DEBUG_SENTRY: environment.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: environment.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: environment.PUBLIC_TRACE_RATE,
	commitSha: __COMMIT_SHA__,
	version: __AQARATECH_APP_VERSION__,
	repoName: 'site',
});
