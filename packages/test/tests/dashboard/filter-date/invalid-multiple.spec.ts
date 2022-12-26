import { test } from './setup';

test('invalid date does not trigger http call - multiple', async ({
	page,
	filters,
}) => {
	// this test should fail to indicate that no http call is made
	test.fail();

	// set start date in the future
	await filters.start.fill('2030-01-01');

	// @ts-expect-error no use
	const [request] = await Promise.all([
		page.waitForRequest(/.*end/, {
			timeout: 5000,
		}),

		// set invalid end date
		filters.end.fill('2019-01-01'),
		filters.end.fill('2020-01-01'),
		filters.end.fill('2021-01-01'),
		// filters.end.fill('2022-01-01'), // Why does this trigger a request?
	]);
});
