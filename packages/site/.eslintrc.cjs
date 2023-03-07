// Example of modular eslint config: https://github.com/iotaledger/firefly/blob/45590a1fb60d8210ab2b590ff553274fae25a51c/.eslintrc.js

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	globals: {
		svelte: 'readonly',
		__AQARATECH_APP_VERSION__: 'readonly',
		$$Generic: 'readonly',
	},
	ignorePatterns: [
		'currency.ts',
		'sandboxed.ts',
		'shortcut.ts',
		'flatten.ts',
		'FrappeChart.svelte',
		'jspdf-invoice-template.js',
		'src/i18n/ar/index.ts', // reports unused eslint-disable directive
	],
	rules: {
		// tslint comments in generated api files
		'@typescript-eslint/ban-tslint-comment': 'off',

		// not compatible with sveltekit's throw redirct/error
		'@typescript-eslint/no-throw-literal': 'off',
	},
	parserOptions: {
		extraFileExtensions: ['.svelte'],
	},
	overrides: [
		{
			files: ['*.svelte'],
			extends: [
				'plugin:svelte/recommended',
				'plugin:@intlify/svelte/recommended',
			],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
				parser: '@typescript-eslint/parser',
				// Example: https://cs.github.com/iotaledger/firefly/blob/45590a1fb60d8210ab2b590ff553274fae25a51c/.eslintrc.js#L112
				extraFileExtensions: ['.svelte'],
				// set rootDir to the path of this file. This allows eslint to work from
				// (a) the root of the project ex. vscode eslint extension,
				// (b) from within the packages directory, using the eslint/svelte-check cli
				tsconfigRootDir: __dirname,
				project: './tsconfig.lint.json',
			},
			settings: {
				// https://ota-meshi.github.io/eslint-plugin-svelte/user-guide/#settings-svelte
				svelte: {
					ignoreWarnings: [
						'@typescript-eslint/no-unsafe-assignment', // reduce false positives
						'@typescript-eslint/no-unsafe-member-access', // reduce false positives
					],
				},
			},
			rules: {
				// incompatible with svelte's generic props
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',

				// not consistent in svelte files (try again after update)
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',

				// https://ota-meshi.github.io/eslint-plugin-svelte/rules/@typescript-eslint/no-unnecessary-condition/
				'@typescript-eslint/no-unnecessary-condition': 'off',
				'svelte/valid-compile': [
					'warn',
					{
						// To ignore 'svelte(a11y-click-events-have-key-events)'
						ignoreWarnings: true,
					},
				],

				// necessary for svelte's $page.params['myParam']
				'@typescript-eslint/no-non-null-assertion': 'off',

				'svelte/no-dupe-use-directives': 'error',
				'svelte/no-dom-manipulating': 'warn',
				'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
				'svelte/no-store-async': 'error',
				'svelte/require-store-callbacks-use-set-param': 'error',
				// 'svelte/valid-prop-names-in-kit-pages': 'error',
				'svelte/no-target-blank': 'error',
				'svelte/no-reactive-functions': 'error',
				'svelte/no-reactive-literals': 'error',
				'svelte/no-useless-mustaches': 'error',
				'svelte/require-optimized-style-attribute': 'error',
				'svelte/require-stores-init': 'error',

				'no-trailing-spaces': 'off', // superseded
				'svelte/no-trailing-spaces': 'error',

				// Stylistic
				'svelte/derived-has-same-inputs-outputs': 'error',
				// 'svelte/first-attribute-linebreak': 'error',
				'svelte/html-closing-bracket-spacing': 'error',
				'svelte/html-quotes': 'error',
				'svelte/max-attributes-per-line': 'warn',
				'svelte/mustache-spacing': 'error',
				'svelte/no-extra-reactive-curlies': 'error',
				'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
				'svelte/prefer-class-directive': 'error',
				'svelte/prefer-style-directive': 'error',
				'svelte/shorthand-attribute': 'error',
				'svelte/shorthand-directive': 'error',
				// 'svelte/sort-attributes': 'error',
				'svelte/spaced-html-comment': 'error',

				// i18n
				'@intlify/svelte/no-raw-text': 'off', // For occasional reference
			},
		},
	],
};
