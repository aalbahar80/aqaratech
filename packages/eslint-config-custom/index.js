const importConfig = require('./import');
// const unicornConfig = require('./unicorn');
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

		// https://github.com/eslint-community/eslint-plugin-security#rules
		'plugin:security/recommended',

		// https://mysticatea.github.io/eslint-plugin-eslint-comments/
		'plugin:eslint-comments/recommended',

		// https://github.com/eslint-community/eslint-plugin-promise#usage
		'plugin:promise/recommended',

		// https://github.com/eslint-community/eslint-plugin-n#eslint-plugin-n
		'plugin:n/recommended',

		// https://github.com/ota-meshi/eslint-plugin-regexp#book-usage
		'plugin:regexp/recommended',

		'prettier',

		...importConfig.extends,
		...turboConfig.extends,
		// ...unicornConfig.extends,
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
			// '../../tsconfig.lint.json', // causes packages/* to be misconfigured
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

		'eslint-comments/no-unlimited-disable': 'off', // Ideally turn off only for generated files
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

		'n/no-missing-import': 'off', // superseded by eslint-plugin-import
		'n/no-missing-require': [
			'error',
			{
				tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx', '.svelte'],
			},
		],

		'n/shebang': 'off', // zx uses shebangs
		'n/no-process-exit': 'off', // zx uses process.exit()
		'n/no-extraneous-import': [
			'error',
			{
				allowModules: ['zx'],
			},
		],

		'security/detect-object-injection': 'off',

		// Overkill:
		// '@typescript-eslint/strict-boolean-expressions': 'warn',
		// '@typescript-eslint/prefer-readonly-parameter-types': 'warn',

		...importConfig.rules,
		...turboConfig.rules,
		// ...unicornConfig.rules,
	},
	ignorePatterns: ['*.sh'],
};
