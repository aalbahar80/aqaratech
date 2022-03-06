import preprocess from 'svelte-preprocess';
import path from 'path';
import adapter from '@sveltejs/adapter-auto';
// import { visualizer } from "rollup-plugin-visualizer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({ postcss: true }),
	],

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/lib/components'),
					$lib: path.resolve('./src/lib'),
				},
			},
			ssr: {
				noExternal: process.env.NODE_ENV === 'production' ? ['superjson'] : [],
				external: ['@temporalio', 'temporalio']
			},
			// plugins: [visualizer((opts) => {
			// 	return { filename: path.join(opts.dir, "stats.html") };
			// }),],
		},
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	},
};

export default config;
