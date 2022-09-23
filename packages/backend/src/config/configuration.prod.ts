import type { EnvironmentConfig } from '../interfaces/environment.interface';

export const productionEnvironment = (): EnvironmentConfig => ({
	type: 'PRODUCTION',
	envName: 'prod',
	apiConfig: {
		PUBLIC_API_URL: process.env.PUBLIC_API_URL,
		PUBLIC_API_URL_LOCAL: process.env.PUBLIC_API_URL_LOCAL,
	},
	authConfig: {
		AUTH0_DOMAIN: 'https://auth.aqaratech.com',
		AUTH0_API_NAMESPACE: 'https://aqaratech.com',
		AUTH0_API_AUDIENCE: 'https://aqaratech.com/api',
	},
	mailConfig: {
		POSTMARK_TOKEN: process.env.POSTMARK_TOKEN,
	},
	debug: {
		DEBUG_NEST: false,
		DEBUG_PRISMA: false,
	},
	meiliSearchConfig: {
		HOST: process.env.MEILISEARCH_HOST,
		API_KEY: process.env.MEILISEARCH_API_KEY,
	},
	siteConfig: {
		PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
	},
	r2Config: {
		R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
		R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
		R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
	},
});
