import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import {
	fromApi,
	assertUneditedForm,
} from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, lease }) => {
	const url = getRoute({
		entity: 'lease',
		pageType: PageType.Id,
		id: lease.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	const resPromise = page.waitForResponse(fromApi);

	await page.goto(url);

	const original = await resPromise;

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'lease',
		pageType: PageType.Edit,
		id: lease.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await expect(page).toHaveURL(edit);

	const resPromise2 = page.waitForResponse(fromApi);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await resPromise2;

	await assertUneditedForm(original, latest);
});
