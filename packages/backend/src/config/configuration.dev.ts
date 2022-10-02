import type { EnvironmentConfig } from '../interfaces/environment.interface';

export const developmentEnvironment = (): EnvironmentConfig => ({
	type: 'DEVELOPMENT',
	envName: 'dev',
	apiConfig: {
		PUBLIC_API_URL: process.env.PUBLIC_API_URL,
		PUBLIC_API_URL_LOCAL: process.env.PUBLIC_API_URL_LOCAL,
	},
	authConfig: {
		AUTH0_DOMAIN: 'https://dev-eehvhdp2.eu.auth0.com',
		AUTH0_API_NAMESPACE: 'https://letand.be',
		AUTH0_API_AUDIENCE: 'letand.be/api',
	},
	mailConfig: {
		POSTMARK_TOKEN: process.env.POSTMARK_TOKEN,
	},
	debug: {
		DEBUG_NEST: process.env.PUBLIC_AQ_DEBUG_NEST == '1',
		DEBUG_PRISMA: process.env.PUBLIC_AQ_DEBUG_PRISMA == '1',
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
