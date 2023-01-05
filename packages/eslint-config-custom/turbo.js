module.exports = {
	extends: ['turbo'],
	rules: {
		// https://github.com/vercel/turborepo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
		'turbo/no-undeclared-env-vars': [
			'error',
			{
				// An array of strings (or regular expressions) to exclude.
				// NOTE: an env variable should only be excluded if it has no effect on build outputs.
				allowList: [
					// 'ORIGIN',
					'PUBLIC_AQARATECH_ENV',
					'PUBLIC_SITE_URL',
					// 'PUBLIC_API_URL',
					// 'PUBLIC_API_URL_LOCAL',
					// 'PUBLIC_AQ_DEBUG_LEVEL',
					// 'PUBLIC_AQ_DEBUG_SENTRY',
					// 'PUBLIC_TRACE_RATE',
					'CI',
					'PUBLIC_COMMIT_SHA',
					// 'PUBLIC_AQ_ENABLE_SENTRY',
					// 'LOGTAIL_TOKEN',
					'ANALYZE_BUNDLE',
				],
			},
		],
	},
};
