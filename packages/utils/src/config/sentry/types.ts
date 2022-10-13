import type { AqaratechEnv } from '../../../../../types/environment';

export type Config = Pick<
	AqaratechEnv,
	| 'PUBLIC_AQARATECH_ENV'
	| 'PUBLIC_AQ_DEBUG_SENTRY'
	| 'PUBLIC_TRACE_RATE'
	| 'PUBLIC_AQ_ENABLE_SENTRY'
> & {
	/**
	 * The version from the package.json.
	 */
	version: string;
	commitSha: string | undefined;
	repoName: string;
};
