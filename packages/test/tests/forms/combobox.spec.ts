import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../config';

test('can be searched', async ({ page }) => {
	await page.goto(`/tenants/${sample.tenants[0].id}/edit`);
	const input = page.locator('input[id="nationality"]');
	await input.fill('Kuwa');
	await page.locator(`data-testid=KWT`).click();
	await expect(input).toHaveValue('Kuwait');
});
