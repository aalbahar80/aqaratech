import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import {
	assertUneditedForm,
	fromApi,
} from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	const resPromise = page.waitForResponse(fromApi);

	await page.goto(url);

	const original = await resPromise;

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Edit,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	const resPromise2 = page.waitForResponse(fromApi);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await resPromise2;

	await assertUneditedForm(original, latest);
});
