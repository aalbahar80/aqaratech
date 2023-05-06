import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		root: './',
		exclude: [
			'mocked.spec.ts',
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
		swc.vite({
			module: {
				type: 'es6', // explicitly set the module type to es6 (avoid inheriting from .swcrc)
			},
		}),
	], // This is required to build the test files with SWC
});
