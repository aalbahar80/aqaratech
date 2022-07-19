import adapter from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

if (process.env.AQ_DEBUG == '1') {
	// passed in as command line argument
	// ex: `AQ_DEBUG=1 pnpm run build`
	console.log(process.env);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: [preprocess({ postcss: true })],
	// experimental: {
	// 	// 	prebundleSvelteLibraries: true,
	// 	inspector: true,
	// },
	kit: {
		adapter:
			process.env.VERCEL || process.env.CF_PAGES ? adapter() : adapterNode(),
	},
};

export default config;
