/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	rules: {
		'@typescript-eslint/promise-function-async': 'off',
		'@typescript-eslint/consistent-type-imports': 'off', // avoid stripping type imports for openapi
		'@typescript-eslint/member-ordering': 'off', // TODO whenever
	},
	overrides: [
		{
			// for all *.module.ts files, turn off the rule @typescript-eslint/no-extraneous-class
			files: ['*.module.ts'],
			rules: {
				'@typescript-eslint/no-extraneous-class': 'off',
			},
		},
		{
			files: ['*.spec.ts', '*.test.ts', 'test/**/*.ts'],
			rules: {
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'security/detect-possible-timing-attacks': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
			},
		},
	],
};
