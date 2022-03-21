const colors = require('tailwindcss/colors')

module.exports = {
	// content: ['./src/**/*.svelte'],
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			// colors: colors.rose,
			teal: colors.teal,
			cyan: colors.cyan,
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],

	// corePlugins: {
	// 	preflight: false,
	// }
};
