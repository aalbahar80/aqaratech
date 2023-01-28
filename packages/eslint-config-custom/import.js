module.exports = {
	extends: [
		// eslint-config-prettier helps with detecting circular dependencies
		// https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	settings: {
		// https://github.com/import-js/eslint-plugin-import#typescript
		'import/resolver': {
			// make sure to install: eslint-import-resolver-node
			// required for pnpm
			node: true,

			// typescript: true,
			typescript: {
				// alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				// Might cause flaky import/order settings between cli and neovim
				project: './tsconfig.lint.json',
			},
		},
		'import/parsers': {
			// https://github.com/ota-meshi/eslint-plugin-svelte/issues/312#issuecomment-1333345847
			'@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
			// Avoids linting some js files with svelte-eslint-parser (when importing from *.svelte?)
			'@babel/parser': ['.js', 'jsx', '.cjs', '.mjs'],
		},
		'import/internal-regex': '^@self',
	},
	rules: {
		// Detect circular dependencies.
		// Be conservative with maxDepth, as it can be expensive.
		'import/no-cycle': ['error', { maxDepth: 2 }],
		'import/no-self-import': 'error',

		'import/no-unresolved': 'off', // superseded by typescript

		// sort imports
		'import/order': [
			'error',
			{
				// Docs: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#importorder
				'newlines-between': 'always',
				warnOnUnassignedImports: true,
				alphabetize: {
					order: 'asc',
					caseInsensitive: true, // in import paths
				},
				pathGroupsExcludedImportTypes: ['svelte'], // allows pathGroups to work with svelte imports
				distinctGroup: false, // not released yet
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
				],
				pathGroups: [
					// cheatsheet: https://globster.xyz/
					// Order in array matters.
					{
						pattern: '+(svelte|\\$app|$types){,*/**}',
						// set pattern options to match "./$types"
						patternOptions: {
							matchBase: true,
							dot: true,
						},
						position: 'before',
						group: 'internal',
					},

					{
						pattern: '+(@self){,*/**}',
						position: 'before',
						group: 'internal',
					},
				],
			},
		],
		// 'sort-imports': ['error'],

		// superseded by typescript-eslint
		// https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import
		'import/named': 'off',
		'import/namespace': 'off',
		'import/default': 'off',
		'import/no-named-as-default-member': 'off',
	},
};
