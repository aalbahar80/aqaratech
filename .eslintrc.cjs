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
		'import/prefer-default-export': 'off',
		'no-console': 'off',
		// 'import/no-unresolved': 'error',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
	},
	plugins: ['svelte3', '@typescript-eslint', 'import'],
	ignorePatterns: ['*.cjs', '*.js'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				// https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md
				'import/first': 'off',
				'import/no-duplicates': 'off',
				'import/no-mutable-exports': 'off',
				'import/no-unresolved': 'off',
				// 'import/no-extraneous-dependencies': 'off',
			},
		},
		// {
		// 	files: ['*.graphql'],
		// 	parser: '@graphql-eslint/eslint-plugin',
		// 	plugins: ['@graphql-eslint'],
		// 	rules: {
		// 		'@graphql-eslint/known-type-names': 'error',
		// 	},
		// },
	],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
