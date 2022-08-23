import adapter from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { dirname, join } from 'path';
import sveltePreprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: [
		sveltePreprocess({
			postcss: {
				configFilePath: join(__dirname, 'postcss.config.cjs'),
			},
		}),
	],
	kit: {
		adapter:
			process.env.VERCEL || process.env.CF_PAGES ? adapter() : adapterNode(),
		env: {
			dir: '../../',
		},
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
