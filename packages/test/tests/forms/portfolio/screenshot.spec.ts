import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	const original = await page.getByTestId('details-pane').screenshot();

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Edit,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await page.getByTestId('details-pane').screenshot();

	const isSame = original.toString() === latest.toString();

	expect(isSame, 'screenshots should be the same').toBe(true);
});
