/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	ignorePatterns: [
		// Ignore generated types
		'types/api/index.d.ts',
	],
	rules: {
		'no-empty-pattern': 'off',

		// Playwright fixtures can be unused
		'@typescript-eslint/no-unused-vars': 'off',

		'turbo/no-undeclared-env-vars': 'off',
	},
	globals: {
		$: 'readonly',
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
