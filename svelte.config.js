import preprocess from 'svelte-preprocess';
import path from 'path';
import adapter from '@sveltejs/adapter-auto';

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
					$components: path.resolve('./src/components'),
					$generated: path.resolve('./src/generated'),
					$routes: path.resolve('./src/routes'),
					$lib: path.resolve('./src/lib'),
				},
			},
			ssr: {
				noExternal: process.env.NODE_ENV === 'production' ? ['superjson'] : []
			}
		},
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	},
};

export default config;
