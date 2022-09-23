module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		// 'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',

		// https://eslint.org/docs/latest/rules/prefer-const#options
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: false,
			},
		],

		// https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],

		// https://typescript-eslint.io/rules/require-await/
		'require-await': 'off',
		'@typescript-eslint/require-await': 'error',

		'@typescript-eslint/no-floating-promises': 'error', // forgetting to await Activities and Workflow APIs is bad
		'@typescript-eslint/no-misused-promises': ['error'],

		// '@typescript-eslint/no-inferrable-types': {
		//   ignoreProperties: true,
		// },
	},
};
