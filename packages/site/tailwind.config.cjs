const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	// content: ['./src/**/*.svelte'],
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			teal: colors.teal,
			cyan: colors.cyan,
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
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
