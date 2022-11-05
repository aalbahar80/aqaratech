/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	rules: {
		// allow non-null assertion
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
};
