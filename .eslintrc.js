/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	ignorePatterns: [
		'packages/**/*',
		// When removing an entry, remember to remove the comment in the file.
		'deploy.mjs',
		'rm-sourcemaps.mjs',
		'upload-sourcemaps.mjs',
	],
	extends: ['custom'],
	// Globals pasted from here: https://github.com/google/zx/blob/0a2cf6cbb5e75f6734fb93e2c65ff82fb749d471/src/globals.ts#L19
	globals: {
		$: 'readonly',
		ProcessPromise: 'readonly',
		ProcessOutput: 'readonly',
		log: 'readonly',
		$: 'readonly',
		argv: 'readonly',
		cd: 'readonly',
		chalk: 'readonly',
		echo: 'readonly',
		fs: 'readonly',
		glob: 'readonly',
		globby: 'readonly',
		nothrow: 'readonly',
		os: 'readonly',
		path: 'readonly',
		question: 'readonly',
		quiet: 'readonly',
		sleep: 'readonly',
		stdin: 'readonly',
		which: 'readonly',
		within: 'readonly',
		YAML: 'readonly',
	},
};
