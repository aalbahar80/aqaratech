/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	rules: {
		'@typescript-eslint/promise-function-async': 'off',
	},
	overrides: [
		{
			// for all *.module.ts files, turn off the rule @typescript-eslint/no-extraneous-class
			files: ['*.module.ts'],
			rules: {
				'@typescript-eslint/no-extraneous-class': 'off',
			},
		},
	],
};
