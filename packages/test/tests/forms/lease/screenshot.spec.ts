import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, lease }) => {
	const url = getRoute({
		entity: 'lease',
		pageType: PageType.Id,
		id: lease.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

	const original = await page.locator('#detailsPane').screenshot();

	await page.locator('text=Edit').click();

	const edit = getRoute({
		entity: 'lease',
		pageType: PageType.Edit,
		id: lease.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await page.locator('#detailsPane').screenshot();

	expect(original.toString()).toEqual(latest.toString());
});
