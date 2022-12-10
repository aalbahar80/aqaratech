import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, expenseCategory }) => {
	const url = getRoute({
		entity: 'expenseCategory',
		pageType: PageType.Id,
		id: expenseCategory.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	const original = await page.getByTestId('details-pane').screenshot();

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'expenseCategory',
		pageType: PageType.Edit,
		id: expenseCategory.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await page.getByTestId('details-pane').screenshot();

	expect(original.toString()).toEqual(latest.toString());
});
