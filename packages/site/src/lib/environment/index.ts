import { env } from '$env/dynamic/public';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';

export const environment: EnvironmentConfig = {
	PUBLIC_AQARATECH_ENV: env.PUBLIC_AQARATECH_ENV,
	PUBLIC_SITE_URL: env.PUBLIC_SITE_URL,
	PUBLIC_API_URL: env.PUBLIC_API_URL,
	PUBLIC_API_URL_LOCAL: env.PUBLIC_API_URL_LOCAL,
	PUBLIC_AQ_DEBUG_SENTRY: env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_TRACE_RATE: env.PUBLIC_TRACE_RATE,
	PUBLIC_AQ_DEBUG_SITE: env.PUBLIC_AQ_DEBUG_SITE,
};
