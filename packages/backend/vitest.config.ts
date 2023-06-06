import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		mockReset: true,
		clearMocks: true,
		root: './',
		threads: false, // incompatible with DB
		setupFiles: ['test/util/setup.ts'],
		exclude: [
			'test/mocked.spec.ts',
			'node_modules',
			'dist',
			'.idea',
			'.git',
			'.cache',
		],
		// alias: {
		// 	src: path.resolve(__dirname, 'src'),
		// 	'@self/utils': path.resolve(__dirname, '../utils/src'),
		// },
	},
	plugins: [
		tsconfigPaths(), // Required to run vitest
		swc.vite({
			module: {
				type: 'es6', // explicitly set the module type to es6 (avoid inheriting from .swcrc)
			},
		}),
	], // This is required to build the test files with SWC
});
