/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Hello from '../routes/index.svelte';

test('Welcome the user', () => {
	// const { getByText } = render(Hello, { props: { name: 'John' } });
	const { getByText } = render(Hello);

	// expect(getByText('Welcome to SvelteKit John')).toBeInTheDocument();
	expect(getByText('Lorem')).toBeInTheDocument();
});
