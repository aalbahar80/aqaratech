const importConfig = require('./import');
const turboConfig = require('./turbo');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',

		// https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/src/configs
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',

		'prettier',

		...importConfig.extends,
		...turboConfig.extends,
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: [
			// For sibling packages: Helps each .eslintrc.js file find its own tsconfig.json file
			'../*/tsconfig.json',
			'../*/tsconfig.lint.json',
			// For root: Helps root .eslintrc.js file find its own tsconfig.json file
			'../../tsconfig.json',
			'../../tsconfig.lint.json',
			// sourceType: 'module',
		],
		// Either here or in site/.eslintrc.cjs, we need to declare
		// `extraFileExtensions: ['.svelte']` option for `@typescript-eslint/parser`.
		extraFileExtensions: ['.svelte'],
	},
	root: true,
	settings: {
		...importConfig.settings,
	},
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ destructuredArrayIgnorePattern: '^_', ignoreRestSiblings: true },
		],

		// https://eslint.org/docs/latest/rules/prefer-const#options
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: false,
			},
		],

		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{
				allowBoolean: true,
			},
		],

		// Better stack traces (at the cost of a bit of performance)
		'no-return-await': 'off',
		'@typescript-eslint/return-await': ['warn', 'always'],

		'@typescript-eslint/promise-function-async': 'warn',

		'@typescript-eslint/ban-ts-comment': 'warn',

		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				disallowTypeAnnotations: false, // we need this for the declaration files (*.d.ts)
			},
		],

		'@typescript-eslint/prefer-readonly': 'warn',
		'@typescript-eslint/member-ordering': 'warn',
		'@typescript-eslint/require-array-sort-compare': 'warn',
		'@typescript-eslint/prefer-regexp-exec': 'warn',
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',

		// Overkill:
		// '@typescript-eslint/strict-boolean-expressions': 'warn',
		// '@typescript-eslint/prefer-readonly-parameter-types': 'warn',

		...importConfig.rules,
		...turboConfig.rules,
	},
	ignorePatterns: ['*.sh'],
};
