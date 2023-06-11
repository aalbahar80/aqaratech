/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				sb: '1024px', // sidebar NOTE: keep width in sync with my-grid media query
			},
			gridTemplateColumns: {
				'my-grid': 'minmax(0px, 16rem) repeat(1, minmax(0, 1fr))',
			},
			fontFamily: {
				sans: [
					'Inter var',
					'Almarai',
					// 'NotoSansArabic var',
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
		require('@tailwindcss/container-queries'),
	],

	darkMode: 'class', // disable auto dark mode
};
