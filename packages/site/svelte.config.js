import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-vercel';
// import { visualizer } from 'rollup-plugin-visualizer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true })],

	// experimental: {
	// 	prebundleSvelteLibraries: true,
	// },

	kit: {
		adapter: adapter(),
		vite: {
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
					  }
					: undefined,
			resolve: {
				alias: {
					$components: resolve('./src/lib/components'),
					$lib: resolve('./src/lib'),
					$models: resolve('.', './src/lib/models'),
					$utils: resolve('.', './src/lib/utils'),
					$routers: resolve('.', './src/lib/server/trpc/routers'),
					$environment: resolve('.', './src/environment'),
					$user: resolve('.', './src/user'),
				},
			},
			ssr: {
				noExternal:
					process.env.NODE_ENV === 'production'
						? [
								'superjson',
								'ms',
								// '@self/temporal',
								'date-fns',
								'@fortawesome/free-solid-svg-icons',
								// '@temporalio/workflow',
						  ]
						: undefined,
				// external:
				// 	process.env.NODE_ENV === 'production'
				// 		? ['@self/temporal']
				// 		: undefined,
			},

			// optimizeDeps: {
			// 	exclude: ['@self/temporal'],
			// },
			// process.env.NODE_ENV !== 'production' ? ['@self/temporal'] : undefined,

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
