module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [
		// require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('daisyui')
	],
	daisyui: {
		themes: ['dracula', 'emerald']
	}
};
