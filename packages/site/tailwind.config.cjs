/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter var',
					'NotoSansArabic var',
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require('tailwindcss/defaultTheme').fontFamily.sans,
				],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],

	darkMode: 'class', // disable auto dark mode
};
