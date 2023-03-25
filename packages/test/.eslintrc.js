/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom', 'plugin:playwright/playwright-test'],
	ignorePatterns: [
		// Ignore generated types
		'types/api/index.d.ts',
	],
	rules: {
		'no-empty-pattern': 'off',

		'@typescript-eslint/no-non-null-assertion': 'off',

		// Playwright fixtures can be unused
		'@typescript-eslint/no-unused-vars': 'off',

		'turbo/no-undeclared-env-vars': 'off',

		// Playwright
		'playwright/prefer-to-have-length': 'error',
		// 'playwright/prefer-to-be': 'error', // TODO: Enable
		// 'playwright/prefer-strict-equal': 'error', // TODO: Enable

		'playwright/no-conditional-in-test': 'off',
		'playwright/no-skipped-test': 'off',
		'playwright/no-wait-for-timeout': 'off',

		'security/detect-non-literal-fs-filename': 'off',
		'security/detect-non-literal-regexp': 'off',
	},
	globals: {
		ProcessPromise: 'readonly',
		ProcessOutput: 'readonly',
		log: 'readonly',
		$: 'readonly',
		argv: 'readonly',
		cd: 'readonly',
		chalk: 'readonly',
		echo: 'readonly',
		fs: 'readonly',
		glob: 'readonly',
		globby: 'readonly',
		nothrow: 'readonly',
		os: 'readonly',
		path: 'readonly',
		question: 'readonly',
		quiet: 'readonly',
		sleep: 'readonly',
		stdin: 'readonly',
		which: 'readonly',
		within: 'readonly',
		YAML: 'readonly',
	},
};
