import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';
import { isoImport } from 'vite-plugin-iso-import';
import { version } from './package.json';
// import basicSsl from '@vitejs/plugin-basic-ssl';

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
					__AQARATECH_APP_VERSION__: JSON.stringify(version),
			  }
			: {
					__AQARATECH_APP_VERSION__: JSON.stringify(version),
			  },
	plugins: [
		sveltekit(),
		icons({ compiler: 'svelte' }),
		isoImport(),
		// basicSsl(),
	],
	ssr: {
		noExternal: ['@self/sdk', 'chart.js'],
	},
	// esbuild: {
	// 	sourcemap: true, // no effect?
	// },
	build: {
		sourcemap: true,
		rollupOptions: {
			// with rollupOptions, source maps work for BUILD: pnpm build && node --inspect -r source-map-support/register build/index.js
			// without rollupOptions, source maps work for PREVIEW: pnpm build && npx vite preview --port 3000
			output: {
				sourcemap: true,
				sourcemapPathTransform: (relativeSourcePath) => {
					if (relativeSourcePath.includes('../src')) {
						// adjust path by one level down
						return relativeSourcePath.replace('../src', 'src');
					}
					return relativeSourcePath;
				},
			},
		},
	},
};

export default config;
