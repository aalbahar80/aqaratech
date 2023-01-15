module.exports = {
	extends: [
		// https://github.com/sindresorhus/eslint-plugin-unicorn#usage
		'plugin:unicorn/recommended',
		// 'plugin:unicorn/all',
	],
	rules: {
		'unicorn/prevent-abbreviations': 'off',

		'unicorn/filename-case': [
			'warn',
			{
				// disable for svelte files
				case: 'kebabCase',
				ignore: [/\.svelte$/],
			},
		],
	},
};
