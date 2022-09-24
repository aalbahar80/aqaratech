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
		'plugin:@typescript-eslint/recommended',
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'turbo',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		// tsconfigRootDir: __dirname,
		// tsconfigRootDir: '.',
		// project: ['./tsconfig.json'],
	},
	root: true,
	rules: {
		// '@next/next/no-html-link-for-pages': 'off',
		// 'react/jsx-key': 'off',
	},
	ignorePatterns: ['.eslintrc.js', 'env.d.ts'],
};
