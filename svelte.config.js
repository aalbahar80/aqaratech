import preprocess from 'svelte-preprocess';
import path from 'path';
// import vercel from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// adapter: vercel(),
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$generated: path.resolve('./src/generated'),
					$routes: path.resolve('./src/routes'),
					$lib: path.resolve('./src/lib')
				}
			}
		}
	}
};

export default config;
