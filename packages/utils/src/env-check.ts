export const envCheck = () => {
	if (!process.env.PUBLIC_SITE_URL) {
		console.error("PUBLIC_SITE_URL is not set");
	}

	console.log("ORIGIN: ", process.env.ORIGIN);
	console.log("PUBLIC_AQARATECH_ENV: ", process.env.PUBLIC_AQARATECH_ENV);
	console.log("PUBLIC_SITE_URL: ", process.env.PUBLIC_SITE_URL);
	console.log("PUBLIC_API_URL: ", process.env.PUBLIC_API_URL);
	console.log("PUBLIC_API_URL_LOCAL: ", process.env.PUBLIC_API_URL_LOCAL);

	console.log("PUBLIC_TRACE_RATE: ", process.env.PUBLIC_TRACE_RATE);
	console.log("PUBLIC_AQ_DEBUG_SENTRY: ", process.env.PUBLIC_AQ_DEBUG_SENTRY);
	console.log("MEILISEARCH_HOST: ", process.env.MEILISEARCH_HOST);

	console.log("PUBLIC_AQ_DEBUG_NEST: ", process.env.PUBLIC_AQ_DEBUG_NEST);
	console.log("PUBLIC_AQ_DEBUG_PRISMA: ", process.env.PUBLIC_AQ_DEBUG_PRISMA);
	console.log("PUBLIC_AQ_DEBUG_SITE: ", process.env.PUBLIC_AQ_DEBUG_SITE);
};
