/**
 * @jest-environment jsdom
 */

import Hello from '../routes/hello.svelte';
import { render } from '@testing-library/svelte';

test('Welcome the user', () => {
	const { getByText } = render(Hello, { props: { name: 'John' } });

	expect(getByText('Welcome to SvelteKit John')).toBeInTheDocument();
});
