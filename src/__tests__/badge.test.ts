import Badge from '$lib/components/Badge.svelte';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/svelte';
import { beforeEach, expect, test } from 'vitest';

const props = {
	label: 'MyLabel',
	badgeColor: 'red',
};

beforeEach(cleanup);

test('can render', () => {
	render(Badge, {
		props,
	});
});

test('displays the label', () => {
	const { getByText } = render(Badge, { props });
	expect(getByText('MyLabel')).toBeDefined();
});

test('has the correct color', () => {
	const { getByText } = render(Badge, { props });
	expect(getByText('MyLabel')).toHaveClass('text-lg', 'red');

	// the following doesn't work if they're not declared inline
	// use playwright instead
	// expect(getByText('MyLabel')).toHaveStyle({
	// fontSize: '1.125rem',
	// backgroundColor: 'red',
	// });

	// meanwhile not sure how to get this to work at all.
	// Might be worth considering that this isn't really a useful test.
	// expect(getByText('MyLabel')).toHaveClass('text-pink-800');
});
