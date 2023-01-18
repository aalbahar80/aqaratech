import { execSync } from 'node:child_process';

import { Logger } from '@nestjs/common';

import { getSentryConfig } from '@self/utils';
import { BackendEnvSchema } from 'src/env/env.schema';

import { version } from '../../package.json';

/**
 * if in docker, grab commit sha from env, otherwise, grab it from git.
 */
const getCommitSha = () => {
	try {
		const sha = execSync('git rev-parse HEAD').toString().trim();
		return sha;
	} catch (e) {
		Logger.log('Could not get commit sha from git');
		if (typeof process.env.PUBLIC_COMMIT_SHA === 'string') {
			Logger.log(
				`Falling back to sha from process.env`,
				process.env.PUBLIC_COMMIT_SHA,
			);
			return process.env.PUBLIC_COMMIT_SHA;
		} else {
			Logger.error('Could not get commit sha from env');
			return 'unknown';
		}
	}
};

export const sentryConfig = (environment: BackendEnvSchema) => {
	const base = getSentryConfig({
		// Need to set debug manually until dep is updated: aqtech/node_modules/.pnpm/@ntegral+nestjs-sentry@4.0.0_crwiabsxshsc3y4hjqoa5hpuxm/node_modules/@ntegral/nestjs-sentry/dist/sentry.service.js
		PUBLIC_AQ_ENABLE_SENTRY: environment.PUBLIC_AQ_ENABLE_SENTRY,
		PUBLIC_AQ_DEBUG_SENTRY: environment.PUBLIC_AQ_DEBUG_SENTRY,
		PUBLIC_AQARATECH_ENV: environment.PUBLIC_AQARATECH_ENV,
		PUBLIC_TRACE_RATE: environment.PUBLIC_TRACE_RATE,
		version,
		repoName: 'backend',
		commitSha: getCommitSha(),
	});

	return {
		...base,
		dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
	};
};
