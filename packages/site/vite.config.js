import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
	// envDir: process.env.RENDER ? resolve(__dirname, '../..') : undefined,
	// test: {
	// 	exclude: ['**/tests/**', 'node_modules'],
	// 	deps: {
	// 		inline: ['date-fns'],
	// 	},
	// },
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
	plugins: [sveltekit(), icons({ compiler: 'svelte' })],
	ssr: {
		noExternal: ['@self/sdk', 'chart.js'],
	},
};

export default config;
