import { expect } from '@playwright/test';

import { test } from './setup';

test('range filter changes to custom when editing start date', async ({
	filters,
}) => {
	// Manually change start date
	await filters.start.fill('2021-01-01');

	// Expect range to be custom
	await expect(filters.range.el).toHaveValue('null');
	expect(await filters.range.label()).toBe('Custom');
});

test('range filter changes to custom when editing end date', async ({
	filters,
}) => {
	// Manually change end date
	await filters.end.fill('2025-01-01');

	// Expect range to be custom
	await expect(filters.range.el).toHaveValue('null');
	expect(await filters.range.label()).toBe('Custom');
});

test('updating date triggers http call', async ({ page, filters }) => {
	const [request] = await Promise.all([
		page.waitForRequest(/.*end=2025-01-01/),

		// set invalid end	date
		filters.end.fill('2025-01-01'),
	]);

	expect(request).toBeTruthy();
});
