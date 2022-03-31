import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/svelte';
import Badge from '../lib/components/Badge.svelte';

afterEach(() => cleanup());

describe('Badge.svelte', () => {
	// TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
	afterEach(() => cleanup());

	it('mounts', () => {
		const { container } = render(Badge, {
			label: 'MyLabel',
			badgeColor: 'red',
		});
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('MyLabel');
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('has the correct color', async () => {
		render(Badge, { label: 'MyLabel', badgeColor: 'red' });
		const div = screen.getByText('MyLabel');
		expect(div).toHaveClass('red');
	});
});
