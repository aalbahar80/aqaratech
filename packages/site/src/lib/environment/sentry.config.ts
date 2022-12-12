import { getSentryConfig } from '@self/utils';

import { environment } from '$lib/environment';

export const sentryConfig = getSentryConfig({
	PUBLIC_AQ_ENABLE_SENTRY: environment.PUBLIC_AQ_ENABLE_SENTRY,
	PUBLIC_AQ_DEBUG_SENTRY: environment.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: environment.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: environment.PUBLIC_TRACE_RATE,
	commitSha: environment.PUBLIC_COMMIT_SHA,
	version: __AQARATECH_APP_VERSION__,
	repoName: 'site',
});
