import { getSentryConfig } from '@self/utils';
import * as Sentry from '@sentry/node';
import { execSync } from 'node:child_process';
import { version } from '../../package.json';

const commitSha = execSync('git rev-parse HEAD').toString().trim();

const baseConfig = getSentryConfig({
	PUBLIC_AQ_DEBUG_SENTRY: process.env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: process.env.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: process.env.PUBLIC_TRACE_RATE,
	version,
	repoName: 'backend',

	// if in docker, grab commit sha from env, otherwise, grab it from git
	commitSha: process.env.PUBLIC_COMMIT_SHA || commitSha,
});

export const sentryConfig = {
	...baseConfig,
	dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({
			tracing: true,
			// breadcrumbs: true,
		}),
	],
};
