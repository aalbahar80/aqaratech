import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
// import Hello from '../routes/index.svelte';
import Badge from '../lib/components/Badge.svelte';

afterEach(() => cleanup());

// async function renderHello(overrideProps = {}) {
// // async function renderHello() {
// 	const svl = render(Hello, {
// 		// props: {
// 		// 	data: [[1, 2, 3]],
// 		// 	...overrideProps,
// 		// },
// 	});

// 	await new Promise(setImmediate);

// 	return svl;
// }

// test('should render hello', async () => {
// 	await renderHello();

// 	expect(screen.getByRole('heading')).toBeInTheDocument();
// 	expect(screen.getByRole('heading')).toHaveTextContent('Lorem');
// });

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

	// it('updates on button click', async () => {
	// 	render(Badge, { count: 4 });
	// 	const btn = screen.getByRole('button');
	// 	const div = screen.getByText('4 x 2 = 8');
	// 	await fireEvent.click(btn);
	// 	expect(div.innerHTML).toBe('4 x 3 = 12');
	// 	await fireEvent.click(btn);
	// 	expect(div.innerHTML).toBe('4 x 4 = 16');
	// });

	it('has the correct color', async () => {
		render(Badge, { label: 'MyLabel', badgeColor: 'red' });
		const div = screen.getByText('MyLabel');
		expect(div).toHaveClass('red');
	});
});
