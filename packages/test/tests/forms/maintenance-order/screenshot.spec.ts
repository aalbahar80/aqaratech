import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({
	page,
	org,
	portfolio,
	maintenanceOrder,
}) => {
	const url = getRoute({
		entity: 'maintenanceOrder',
		pageType: PageType.Id,
		id: maintenanceOrder.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

	const original = await page.getByTestId('details-pane').screenshot();

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'maintenanceOrder',
		pageType: PageType.Edit,
		id: maintenanceOrder.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await page.getByTestId('details-pane').screenshot();

	const isSame = original.toString() === latest.toString();

	expect(isSame, 'screenshots should be the same').toBe(true);
});
