import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/svelte';
import Hello from '../routes/index.svelte';

afterEach(() => cleanup());

// async function renderHello(overrideProps = {}) {
async function renderHello() {
	const svl = render(Hello, {
		// props: {
		// 	data: [[1, 2, 3]],
		// 	...overrideProps,
		// },
	});

	await new Promise(setImmediate);

	return svl;
}

test('should render hello', async () => {
	await renderHello();

	expect(screen.getByRole('heading')).toBeInTheDocument();
	expect(screen.getByRole('heading')).toHaveTextContent('Lorem');
});
