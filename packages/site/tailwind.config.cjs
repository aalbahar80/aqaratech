// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				sb: '1024px', // sidebar NOTE: keep width in sync with my-grid media query
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

		// TODO: remove once feature is released
		// https://github.com/tailwindlabs/tailwindcss/pull/10166#issuecomment-1432382055
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					/* eslint-disable @typescript-eslint/no-unsafe-assignment */
					ms: (value) => ({
						'margin-inline-start': value,
					}),
					me: (value) => ({
						'margin-inline-end': value,
					}),
					ps: (value) => ({
						'padding-inline-start': value,
					}),
					pe: (value) => ({
						'padding-inline-end': value,
					}),
					start: (value) => ({
						'inset-inline-start': value,
					}),
					end: (value) => ({
						'inset-inline-end': value,
					}),
					/* eslint-enable @typescript-eslint/no-unsafe-assignment */
				},
				{ values: theme('spacing') },
			);
		}),
	],

	darkMode: 'class', // disable auto dark mode
};
