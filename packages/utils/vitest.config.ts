import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		alias: {
			// Needed to let vitest know about the alias in tsconfig.json
			src: path.resolve(__dirname, 'src'),
		},
	},
});
