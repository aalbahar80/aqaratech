import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, unit }) => {
	const url = getRoute({
		entity: 'unit',
		pageType: PageType.Id,
		id: unit.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

	const original = await page.locator('#detailsPane').screenshot();

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'unit',
		pageType: PageType.Edit,
		id: unit.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await page.locator('#detailsPane').screenshot();

	expect(original.toString()).toEqual(latest.toString());
});
