import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import {
	assertUneditedForm,
	fromApi,
} from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, property }) => {
	const url = getRoute({
		entity: 'property',
		pageType: PageType.Id,
		id: property.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		},
	});

	const resPromise = page.waitForResponse(fromApi);

	await page.goto(url);

	const original = await resPromise;

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'property',
		pageType: PageType.Edit,
		id: property.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		},
	});

	await expect(page).toHaveURL(edit);

	const resPromise2 = page.waitForResponse(fromApi);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await resPromise2;

	await assertUneditedForm(original, latest);
});
