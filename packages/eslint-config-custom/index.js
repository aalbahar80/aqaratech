/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'turbo',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		// tsconfigRootDir: __dirname,
		tsconfigRootDir: '.',
		project: ['./tsconfig.json'],
	},
	root: true,
	rules: {
		// '@next/next/no-html-link-for-pages': 'off',
		// 'react/jsx-key': 'off',
	},
	ignorePatterns: ['.eslintrc.js', 'env.d.ts'],
};
