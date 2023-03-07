const importConfig = require('./import');
// const unicornConfig = require('./unicorn');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		node: true,
	},
	plugins: ['@typescript-eslint'],
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

		...importConfig.extends,
		// ...unicornConfig.extends,
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// Declare a single tsconfig file. Don't set tsconfigRootDir. Don't use globs.
		// Otherwise, the parser will try to find tsconfig.json files in parent/sibling directories.
		// Also see resolver setting in eslint-plugin-import.
		project: './tsconfig.lint.json',
	},
	root: true,
	settings: {
		...importConfig.settings,
	},
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ destructuredArrayIgnorePattern: '^_', ignoreRestSiblings: true },
		],

		// https://eslint.org/docs/latest/rules/prefer-const#options
		'prefer-const': [
			'warn',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: false,
			},
		],

		'@typescript-eslint/restrict-template-expressions': [
			'warn',
			{
				allowBoolean: true,
			},
		],

		// Better stack traces (at the cost of a bit of performance)
		'no-return-await': 'off',
		'@typescript-eslint/return-await': ['warn', 'always'],

		'@typescript-eslint/promise-function-async': 'warn',

		'@typescript-eslint/ban-ts-comment': 'warn',

		'@typescript-eslint/no-import-type-side-effects': 'warn',
		'@typescript-eslint/consistent-type-exports': 'warn',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
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
		'eslint-comments/disable-enable-pair': ['warn', { allowWholeFile: true }],

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
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],

		// Overkill:
		// '@typescript-eslint/strict-boolean-expressions': 'warn',
		// '@typescript-eslint/prefer-readonly-parameter-types': 'warn',

		...importConfig.rules,
		// ...unicornConfig.rules,
	},
	ignorePatterns: ['*.sh'],
};
