import adapterNode from '@sveltejs/adapter-node';
import { dirname, join } from 'path';
import sveltePreprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: [
		sveltePreprocess({
			sourceMap: true,
			postcss: {
				configFilePath: join(__dirname, 'postcss.config.cjs'),
			},
		}),
	],
	compilerOptions: {
		enableSourcemap: true,
		sourcemap: true,
	},
	kit: {
		adapter: adapterNode(),
		env: {
			dir: '../../',
		},
		alias: {
			$lib: 'src/lib',
			'$lib/*': 'src/lib/*',
			'$components/*': './src/lib/components/*',
			$models: 'src/lib/models/index.ts',
			'$models/*': 'src/lib/models/*',
			$utils: 'src/lib/utils/index.ts',
			'$utils/*': 'src/lib/utils/*',
			$aqenvironment: 'src/lib/environment/index.ts',
			'$aqenvironment/*': 'src/lib/environment/*',
			$api: 'src/api/index.ts',
			'$api/*': 'src/api/*',
		},
		prerender: {
			// Setting prerendering to false because otherwise, errors will be thrown during build.
			// Examples: No logtail token. Zod errors for env variables.
			enabled: false,
		},
	},
	// vitePlugin: {
	// 	experimental: {
	// 		// 	prebundleSvelteLibraries: true,
	// 		/** shortcut: meta + shift */
	// 		inspector: {
	// 			showToggleButton: 'always',
	// 		},
	// 	},
	// },
};

export default config;
