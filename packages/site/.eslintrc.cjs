// Example of modular eslint config: https://github.com/iotaledger/firefly/blob/45590a1fb60d8210ab2b590ff553274fae25a51c/.eslintrc.js

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
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
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				// disable rules that conflict with eslint-plugin-svelte3
				// List here: https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md
				'import/first': 'off',
				'import/no-duplicates': 'off',
				'import/no-mutable-exports': 'off',
				'import/prefer-default-export': 'off',

				// disable rules that don't work with svelte's generic props
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
			},
		},
	],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'svelte3/ignore-styles': () => true,
		'svelte3/ignore-warnings': () => ['a11y-click-events-have-key-events'],
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		// Example: https://cs.github.com/iotaledger/firefly/blob/45590a1fb60d8210ab2b590ff553274fae25a51c/.eslintrc.js#L112
		extraFileExtensions: ['.svelte'],
		// set rootDir to the path of this file. This allows eslint to work from
		// (a) the root of the project ex. vscode eslint extension,
		// (b) from within the packages directory, using the eslint/svelte-check cli
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	globals: {
		svelte: 'readonly',
		__AQARATECH_APP_VERSION__: 'readonly',
	},
};
