import { Logger } from '@nestjs/common';
import { getSentryConfig } from '@self/utils';
import { execSync } from 'node:child_process';
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

const baseConfig = getSentryConfig({
	// Need to set debug manually until dep is updated: aqtech/node_modules/.pnpm/@ntegral+nestjs-sentry@4.0.0_crwiabsxshsc3y4hjqoa5hpuxm/node_modules/@ntegral/nestjs-sentry/dist/sentry.service.js
	PUBLIC_AQ_DEBUG_SENTRY: process.env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: process.env.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: process.env.PUBLIC_TRACE_RATE,
	version,
	repoName: 'backend',

	commitSha: getCommitSha(),
});

Logger.log(baseConfig, 'AqaratechConfig');

export const sentryConfig = {
	...baseConfig,
	dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
};
