import { expect } from '@playwright/test';
import { test } from '../api/api-fixtures';

test('can be searched', async ({ page, tenant }) => {
	await page.goto(`/tenants/${tenant.id}/edit`);

	const input = page.locator('input[id="nationality"]');

	await input.fill('Kuwa');

	await page.locator(`data-testid=KWT`).click();

	await expect(input).toHaveValue('Kuwait');
});
