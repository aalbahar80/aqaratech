/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	ignorePatterns: [
		// direct children of src/
		'src/*.ts',
	],
};
