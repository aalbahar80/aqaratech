/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	env: {
		jest: true,
	},
	// rules: {
	// '@typescript-eslint/interface-name-prefix': 'off',
	// '@typescript-eslint/explicit-function-return-type': 'off',
	// '@typescript-eslint/explicit-module-boundary-types': 'off',
	// '@typescript-eslint/no-explicit-any': 'off',
	// '@typescript-eslint/no-inferrable-types': {
	//   ignoreProperties: true,
	// },
	// },
};
