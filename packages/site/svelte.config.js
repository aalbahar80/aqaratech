import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';
// import { resolve } from 'path';

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
		adapter: adapter(),
		methodOverride: {
			allowed: ['PATCH', 'DELETE'],
		},
		alias: {
			$components: 'src/lib/components',
			$models: 'src/lib/models',
			$utils: 'src/lib/utils',
			$environment: 'src/lib/environment',
			$user: 'src/user',
		},
	},
	vite: {
		plugins: [icons({ compiler: 'svelte', autoInstall: false })],
		// resolve: {
		// alias: {
		// 	$components: resolve('./src/lib/components'),
		// 	$lib: resolve('.', './src/lib'),
		// 	$models: resolve('./src/lib/models'),
		// 	$utils: resolve('.', './src/lib/utils'),
		// 	$routers: resolve('.', './src/lib/server/trpc/routers'),
		// 	$environment: resolve('.', './src/lib/environment'),
		// 	$user: resolve('.', './src/user'),
		// 	// '@self/site': resolve('./src/lib'),
		// },
		// },
		// test: {
		// 	exclude: ['**/tests/**', 'node_modules'],
		// 	deps: {
		// 		inline: ['date-fns'],
		// 	},
		// },
		// define:
		// 	process.env.NODE_ENV === 'production'
		// 		? {
		// 				__SENTRY_DEBUG__: false,
		// 				VITE_MY_VAR: 'SOME_VALUE',
		// 		  }
		// 		: undefined,
		// ssr: {
		// 	noExternal:
		// 		process.env.NODE_ENV === 'production'
		// 			? [
		// 					'superjson',
		// 					// 'date-fns',
		// 			  ]
		// 			: undefined,
		// },
	},
};

export default config;
