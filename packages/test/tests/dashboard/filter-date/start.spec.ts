import { expect } from '@playwright/test';

import { test } from './setup';

test('start date persists', async ({ page, filters }) => {
	// set start date first, making range invalid
	await filters.start.fill('2030-01-01');
	await page.waitForTimeout(200); // wait for debounce timer

	const [request] = await Promise.all([
		page.waitForRequest(/.*start=2030-01-01&end=2031-01-01.*/),

		// set start to fix range
		filters.end.fill('2031-01-01'),
	]);

	expect(request).toBeTruthy();
});
