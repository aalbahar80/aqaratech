import adapterV from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

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
		adapter: adapterV(),
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
};

export default config;
