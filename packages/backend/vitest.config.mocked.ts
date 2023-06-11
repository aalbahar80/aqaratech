import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		root: './',
		include: ['./test/mocked.spec.ts'],
		setupFiles: ['./test/setup.ts'],
	},
	plugins: [
		swc.vite({
			module: {
				type: 'es6',
			},
		}),
	],
});
