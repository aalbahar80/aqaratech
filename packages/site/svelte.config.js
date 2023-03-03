// @ts-check
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: vitePreprocess(),

	// DOCS: https://svelte.dev/docs#compile-time-svelte-compile
	compilerOptions: {
		enableSourcemap: true,
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
			$i18n: 'src/i18n',
		},
	},
	vitePlugin: {
		experimental: {
			// 	prebundleSvelteLibraries: true,

			// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#inspector
			/** shortcut: meta + shift */
			inspector: {
				toggleKeyCombo: 'meta-shift',
				// showToggleButton: 'active',
				// showToggleButton: 'always',
				holdMode: true,
				toggleButtonPos: 'bottom-right',
			},
		},
	},
	onwarn: (
		/** @type {import('svelte/types/compiler/interfaces').Warning} */
		warning,
		/** @type {(arg0: import("svelte/types/compiler/interfaces").Warning) => void} */ handler,
	) => {
		if (warning.code === 'a11y-click-events-have-key-events') {
			return;
		}
		handler(warning);
	},
};

export default config;
