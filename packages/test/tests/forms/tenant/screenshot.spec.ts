import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, tenant }) => {
	const url = getRoute({
		entity: 'tenant',
		pageType: PageType.Id,
		id: tenant.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	const original = await page.locator('#detailsPane').screenshot();

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'tenant',
		pageType: PageType.Edit,
		id: tenant.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await page.locator('#detailsPane').screenshot();

	expect(original.toString()).toEqual(latest.toString());
});
