// /**
//  * @jest-environment jsdom
//  */

// import { render } from '@testing-library/svelte';
// import Hello from '../routes/index.svelte';

// test('Welcome the user', () => {
// 	// const { getByText } = render(Hello, { props: { name: 'John' } });
// 	const { getByText } = render(Hello);

// 	// expect(getByText('Welcome to SvelteKit John')).toBeInTheDocument();
// 	expect(getByText('Lorem')).toBeInTheDocument();
// });
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/svelte';
import Hello from '../routes/index.svelte';

afterEach(() => cleanup());

async function renderHello(overrideProps = {}) {
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

	// expect(screen.getByRole('complementary')).toHaveClass(
	// 	'gridjs gridjs-container',
	// );
	expect(screen.getByRole('heading')).toBeInTheDocument();
	expect(screen.getByRole('heading')).toHaveTextContent('Lorem');
	// expect(screen.getByRole('heading')).toHaveClass('gridjs-table');
	// expect(screen.findByText('Lorem')).toBeInTheDocument();
	// check if page has text Lorem
	// expect(screen.ele('Lorem')).toBeInTheDocument();
});
