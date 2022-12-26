import { test } from './setup';

test('invalid date does not trigger http call', async ({ page, filters }) => {
	// this test should fail to indicate that no http call is made
	test.fail();

	// @ts-expect-error no use
	const [request] = await Promise.all([
		page.waitForRequest(/.*end/, {
			timeout: 5000,
		}),

		// set invalid end	date
		filters.end.fill('1990-01-01'),
	]);
});
