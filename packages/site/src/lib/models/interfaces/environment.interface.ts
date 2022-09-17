export type EnvironmentType = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
	PUBLIC_AQARATECH_ENV: string;

	// URL's
	PUBLIC_SITE_URL: string;
	PUBLIC_API_URL: string;
	PUBLIC_API_URL_LOCAL: string;

	// Sentry
	PUBLIC_TRACE_RATE: string;

	// Debug
	PUBLIC_AQ_DEBUG_SITE: string;
	PUBLIC_AQ_DEBUG_SENTRY: string;
}
