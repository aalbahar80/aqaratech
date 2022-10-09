import { sveltekit } from '@sveltejs/kit/vite';
import { execSync } from 'child_process';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
import { version } from './package.json';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/#environment-variables
// TODO consider using loadEnv helper instead of scripts/export-env.sh in preview command

// TODO don't generate sourcemaps if PUBLIC_AQARATECH_ENV is production

export default defineConfig(() => {
	/** @type {import('vite').UserConfig} */
	const common = {
		plugins: [
			sveltekit(),
			icons({ compiler: 'svelte' }),
			isoImport(),
			// basicSsl(),
		],
		clearScreen: false,
		ssr: {
			// set chart.js as `noExternal` to avoid issues in SSR (when running `vite preview`)
			noExternal: ['chart.js'],
		},
		build: {
			// Generate sourcemaps for all builds. In production, remove them before building Docker image.
			// This is to match the random chunk names with their original sourcemaps.
			sourcemap: true,
			rollupOptions: {
				// with rollupOptions, source maps work for BUILD: pnpm build && node --inspect -r source-map-support/register build/index.js
				// without rollupOptions, source maps work for PREVIEW: pnpm build && pnpm vite preview --port 3000
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
		// esbuild: {
		// 	sourcemap: true, // no effect?
		// },
	};

	const appVersion = JSON.stringify(version);
	const commitSha = JSON.stringify(
		execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim(),
	);

	/** @type {import('vite').UserConfig} */
	const dev = {
		define: {
			__AQARATECH_APP_VERSION__: appVersion,
			__COMMIT_SHA__: commitSha,
		},
	};

	/** @type {import('vite').UserConfig} */
	const prod = {
		define: {
			__AQARATECH_APP_VERSION__: appVersion,
			__COMMIT_SHA__: commitSha,
			__SENTRY_DEBUG__: false,
		},
	};

	if (process.env.PUBLIC_AQARATECH_ENV === 'production') {
		console.log('Building for production.');
		return {
			...common,
			...prod,
		};
	} else {
		console.log('Building for development.');
		return {
			...common,
			...dev,
		};
	}
});
