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
					'PUBLIC_AQARATECH_ENV',
					'PUBLIC_SITE_URL',
					'CI',
					'PUBLIC_COMMIT_SHA',
					'ANALYZE_BUNDLE',
					'BODY_SIZE_LIMIT',
				],
			},
		],
	},
};
