import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';
// import { visualizer } from 'rollup-plugin-visualizer';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), icons({ compiler: 'svelte' })],
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
	ssr: {
		noExternal:
			process.env.NODE_ENV === 'production'
				? [
						'superjson',
						// 'date-fns',
				  ]
				: undefined,
	},
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
};

export default config;
