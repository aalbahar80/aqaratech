import { expect } from '@playwright/test';

import { test } from './fixture';

test('income page', async ({ page }) => {
	await expect(page).toHaveScreenshot();
});
