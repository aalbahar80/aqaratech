import '../src/styles/tailwind.css';
// import '../src/styles/tailwind-output.css';

import Wrapper from '../src/Wrapper.svelte';

import { initialize, mswDecorator } from 'msw-storybook-addon';
import { myMocks } from '../mocks/handlers';

// Initialize MSW
initialize();

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	msw: myMocks
};

// Provide the MSW addon decorator globally
// Order matters
export const decorators = [mswDecorator, () => Wrapper];
