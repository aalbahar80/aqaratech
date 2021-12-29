module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:storybook/recommended',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'prettier', // needs to be last
	],
	rules: {
		// indent: 'off',
		// 'no-tabs': 0,
		// '@typescript-eslint/indent': [2, 'tab'],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
	},
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
		{
			files: ['*.graphql', '*.svelte'],
			parser: '@graphql-eslint/eslint-plugin',
			plugins: ['@graphql-eslint'],
			rules: {
				'@graphql-eslint/known-type-names': 'error',
			},
		},
	],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.svelte'],
			},
		},
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019,
		// tsconfigRootDir: __dirname,
		project: './tsconfig.json',
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
