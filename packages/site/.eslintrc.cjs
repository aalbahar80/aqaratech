// Example of modular eslint config: https://github.com/iotaledger/firefly/blob/45590a1fb60d8210ab2b590ff553274fae25a51c/.eslintrc.js

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: [
		'currency.ts',
		'FrappeChart.svelte',
		'jspdf-invoice-template.js',
		// Remove once a modular eslint config is implemented. Mainly, typescript-eslint shouldn't be applied for non ts/svelte files.
		'*.cjs',
		'svelte.config.js',
		'vite.config.js',
	],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'svelte3/ignore-styles': () => true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		project: './tsconfig.json',
		// Example: https://cs.github.com/iotaledger/firefly/blob/45590a1fb60d8210ab2b590ff553274fae25a51c/.eslintrc.js#L112
		extraFileExtensions: ['.svelte'],
		tsconfigRootDir: './',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ destructuredArrayIgnorePattern: '^_' },
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
			},
		],
		// Note: you must disable the base rule as it can report incorrect errors
		// https://typescript-eslint.io/rules/require-await/
		'require-await': 'off',
		'@typescript-eslint/require-await': 'error',
	},
	globals: {
		svelte: 'readonly',
		__AQARATECH_APP_VERSION__: 'readonly',
	},
};
