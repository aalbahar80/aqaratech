import adapterN from '@sveltejs/adapter-node';
import adapterV from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true })],
	experimental: {
		// 	prebundleSvelteLibraries: true,
		inspector: true,
	},
	kit: {
		adapter: process.env.VERCEL ? adapterV() : adapterN(),
		methodOverride: {
			allowed: ['PATCH', 'DELETE'],
		},
	},
};

export default config;
