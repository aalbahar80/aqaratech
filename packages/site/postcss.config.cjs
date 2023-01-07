/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		// @ts-expect-error unknown
		tailwindcss(path.resolve(__dirname, './tailwind.config.cjs')),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
	],
};

module.exports = config;
