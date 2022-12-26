import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import adapterNode from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

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
