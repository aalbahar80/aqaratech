import adapter from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { resolve } from 'path';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';
// import { visualizer } from 'rollup-plugin-visualizer';

if (process.env.AQ_DEBUG == '1') {
	// passed in as command line argument
	// ex: `AQ_DEBUG=1 pnpm run build`
	console.log(process.env);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: [preprocess({ postcss: true })],

	experimental: {
		// 	prebundleSvelteLibraries: true,
		inspector: true,
	},
	kit: {
		adapter: process.env.VERCEL || process.env.CF_PAGES  ? adapter() : adapterNode(),
		vite: {
			envDir: process.env.RENDER ? resolve(__dirname, '../..') : undefined,
			// delete .svelte-kit folder b4 testing
			test: {
				exclude: ['**/tests/**', 'node_modules'],
				deps: {
					inline: ['date-fns'],
				},
			},
			define:
				process.env.NODE_ENV === 'production'
					? {
							__SENTRY_DEBUG__: false,
							VITE_MY_VAR: 'SOME_VALUE',
					  }
					: undefined,
			resolve: {
				alias: {
					$components: resolve('./src/lib/components'),
					$lib: resolve('.', './src/lib'),
					$models: resolve('./src/lib/models'),
					$utils: resolve('.', './src/lib/utils'),
					$environment: resolve('.', './src/lib/environment'),
					$user: resolve('.', './src/user'),
				},
			},
			plugins: [icons({ compiler: 'svelte' })],
			// plugins:
			// 	process.env.NODE_ENV === 'development'
			// 		? [
			// 				visualizer((opts) => {
			// 					return {
			// 						filename: path.join(opts.dir, 'stats.html'),
			// 						open: true,
			// 						openOptions: {
			// 							app: 'google-chrome'
			// 						}
			// 					};
			// 				}),
			// 		  ]
			// 		: undefined,
		},
		methodOverride: {
			allowed: ['PATCH', 'DELETE'],
		},
	},
};

export default config;
