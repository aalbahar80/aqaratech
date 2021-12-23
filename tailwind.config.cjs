module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
		// require('@tailwindcss/forms'),
		require('daisyui')
	],
	daisyui: {
		themes: ['dracula', 'emerald'],
		// themes: false
		styled: false
	}
};
