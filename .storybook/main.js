const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-svelte-csf',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss')
				}
			}
		}
	],
	svelteOptions: {
		// preprocess: import('../svelte.config.js').preprocess
		preprocess: sveltePreprocess()
	},
	// Changed below to get storybook to workt with svelte.
	// https://github.com/storybookjs/storybook/issues/11587#issuecomment-898604266
	// https://imfeld.dev/writing/sveltekit_with_storybook
	// "svelteOptions": {
	//   "preprocess": preprocess(),
	// }
	staticDirs: ['../public'],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: [/\.stories\.js$/, /index\.js$/],
			use: [require.resolve('@storybook/source-loader')],
			include: [path.resolve(__dirname, '../src')],
			enforce: 'pre'
		});
		config.resolve.alias = {
			...config.resolve.alias,
			$components: path.resolve(__dirname, '../src/components'),
			$routes: path.resolve(__dirname, '../src/routes'),
			$generated: path.resolve(__dirname, '../src/generated')
		};
		return config;
	},
	core: {
		builder: 'webpack4'
	}
};
