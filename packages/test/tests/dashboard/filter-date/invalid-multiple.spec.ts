import { expect } from '@playwright/test';

import { test } from './setup';

test('invalid date does not trigger http call - multiple', async ({
	page,
	filters,
}) => {
	// set start date in the future
	await filters.start.fill('2030-01-01');

	// prepare to catch request if it happens
	const requestPromise = page.waitForRequest(/.*end/, { timeout: 5000 });

	// set invalid end dates
	await filters.end.fill('2019-01-01');
	await filters.end.fill('2020-01-01');
	await filters.end.fill('2021-01-01');

	// await filters.end.fill('2022-01-01'); // Why does this trigger a request?

	await expect(requestPromise).rejects.toThrowError(/Timeout/);
});
