const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	// content: ['./src/**/*.svelte'],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}',
	],

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
		require('@brainandbones/skeleton/tailwind.cjs'),
	],

	// corePlugins: {
	// 	preflight: false,
	// }
};
