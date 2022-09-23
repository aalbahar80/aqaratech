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
		POSTMARK_TOKEN:
			process.env.POSTMARK_TOKEN || 'aecd4fd3-1314-44e9-b1b5-d7dbb89fd0ca',
	},
	debug: {
		DEBUG_NEST: process.env.AQ_DEBUG_NEST == '1',
		DEBUG_PRISMA: process.env.AQ_DEBUG_PRISMA == '1',
	},
	meiliSearchConfig: {
		HOST: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
		API_KEY: process.env.MEILI_MASTER_KEY || 'MASTER_KEY',
	},
	siteConfig: {
		PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || 'http://localhost:3000',
	},
	r2Config: {
		R2_ACCOUNT_ID:
			process.env.R2_ACCOUNT_ID || '8aa55983de332834393a9f4c4fbf1e35',
		R2_ACCESS_KEY_ID:
			process.env.R2_ACCESS_KEY_ID || '54ab96f25c44b09ab1f47d586f363ec1',
		R2_SECRET_ACCESS_KEY:
			process.env.R2_SECRET_ACCESS_KEY ||
			'a37d8ba3101b0635f5aa119c9aafad6f0dfffc318948f91a54c24fcf6c4cd9bf',
	},
});
