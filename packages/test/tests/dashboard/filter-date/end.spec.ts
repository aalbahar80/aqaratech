import { expect } from '@playwright/test';

import { test } from './setup';

test('end date persists', async ({ page, filters }) => {
	// set end date first, making range invalid
	await filters.end.fill('2020-01-01');
	await page.waitForTimeout(200); // wait for debounce timer

	const [request] = await Promise.all([
		page.waitForRequest(/.*start=2019-01-01&end=2020-01-01.*/),

		// set start to fix range
		filters.start.fill('2019-01-01'),
	]);

	expect(request).toBeTruthy();
});
