import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import adapterN from '@sveltejs/adapter-node';
import adapterV from '@sveltejs/adapter-vercel';
// import { visualizer } from 'rollup-plugin-visualizer';
import icons from 'unplugin-icons/vite';

console.log(process.env, 'svelte.config.js');
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true })],

	experimental: {
		// 	prebundleSvelteLibraries: true,
		inspector: true,
	},
	compilerOptions: {
		loopGuardTimeout: process.env.NODE_ENV === 'production' ? undefined : 300,
	},
	kit: {
		adapter: process.env.VERCEL ? adapterV() : adapterN(),
		vite: {
			envDir: resolve(__dirname, './env'),
			optimizeDeps: {
				include: process.env.NODE_ENV === 'production' ? [] : ['@self/sdk'],
			},
			server: {
				watch: {
					ignored: [
						(path) => {
							console.log({ path }, 'svelte.config.js ~ 32');
							if (path.includes('layout')) {
								console.log({ path }, 'svelte.config.js ~ 32');
								console.log('---------------------');
								return true;
							}
						},
					],
				},
			},
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
					$routers: resolve('.', './src/lib/server/trpc/routers'),
					$environment: resolve('.', './src/lib/environment'),
					$user: resolve('.', './src/user'),
					// '@self/site': resolve('./src/lib'),
				},
			},
			ssr: {
				noExternal:
					process.env.NODE_ENV === 'production'
						? [
								'superjson',
								// 'date-fns',
						  ]
						: undefined,
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
