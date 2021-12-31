/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Hello from '../routes/hello.svelte';

test('Welcome the user', () => {
	const { getByText } = render(Hello, { props: { name: 'John' } });

	expect(getByText('Welcome to SvelteKit John')).toBeInTheDocument();
});
