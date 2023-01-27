import { expect } from '@playwright/test';

import { test } from './setup';

test('invalid date does not trigger http call', async ({ page, filters }) => {
	// prepare to catch request if it happens
	const requestPromise = page.waitForRequest(/.*end/, { timeout: 5000 });

	await filters.end.fill('1990-01-01');

	await expect(requestPromise).rejects.toThrowError(/Timeout/);
});
