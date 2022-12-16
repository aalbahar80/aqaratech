/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	ignorePatterns: [
		// When removing an entry, remember to remove the comment in the file.
		'http-log-format.ts',
	],
};
