import adapter from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: [preprocess({ postcss: true })],
	kit: {
		adapter:
			process.env.VERCEL || process.env.CF_PAGES ? adapter() : adapterNode(),
	},
	// vitePlugin: {
	// 	experimental: {
	// 		// 	prebundleSvelteLibraries: true,
	// 		inspector: {
	// 			showToggleButton: 'always',
	// 		},
	// 	},
	// },
};

export default config;
