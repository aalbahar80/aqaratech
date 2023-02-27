import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import {
	assertUneditedForm,
	fromApi,
} from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, expense }) => {
	const url = getRoute({
		entity: 'expense',
		pageType: PageType.Id,
		id: expense.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	const resPromise = page.waitForResponse((res) =>
		// be explicit, avoid catching categories request
		fromApi(res, () => res.url().includes(expense.id)),
	);

	await page.goto(url);

	const original = await resPromise;

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'expense',
		pageType: PageType.Edit,
		id: expense.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await expect(page).toHaveURL(edit);

	const resPromise2 = page.waitForResponse((res) =>
		// be explicit, avoid catching categories request
		fromApi(res, () => res.url().includes(expense.id)),
	);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await resPromise2;

	await assertUneditedForm(original, latest);
});
