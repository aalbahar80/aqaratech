import { env } from '$env/dynamic/public';
import type { AqaratechEnv } from '../../../../../types/environment';

type SiteEnvironment = Pick<
	AqaratechEnv,
	| 'PUBLIC_AQARATECH_ENV'
	| 'PUBLIC_SITE_URL'
	| 'PUBLIC_API_URL'
	| 'PUBLIC_API_URL_LOCAL'
	| 'PUBLIC_AQ_DEBUG_SENTRY'
	| 'PUBLIC_TRACE_RATE'
	| 'PUBLIC_AQ_DEBUG_SITE'
>;

export const environment: SiteEnvironment = {
	PUBLIC_AQARATECH_ENV:
		env.PUBLIC_AQARATECH_ENV as SiteEnvironment['PUBLIC_AQARATECH_ENV'],
	PUBLIC_SITE_URL: env.PUBLIC_SITE_URL,
	PUBLIC_API_URL: env.PUBLIC_API_URL,
	PUBLIC_API_URL_LOCAL: env.PUBLIC_API_URL_LOCAL,
	PUBLIC_AQ_DEBUG_SENTRY: env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_TRACE_RATE: env.PUBLIC_TRACE_RATE,
	PUBLIC_AQ_DEBUG_SITE: env.PUBLIC_AQ_DEBUG_SITE,
};
