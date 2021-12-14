module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
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
