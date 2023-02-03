import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';
import { apiURL } from '../../api/fixtures/api-url';

test('screenshot smoke test', async ({ page, org, tenant }) => {
	const url = getRoute({
		entity: 'tenant',
		pageType: PageType.Id,
		id: tenant.id,
		params: { organizationId: org.organization.id },
	});

	const resPromise = page.waitForResponse((res) => {
		const u = new URL(res.url());
		return u.href.includes(apiURL) && u.pathname.includes('tenants');
	});

	await page.goto(url);

	const res = await resPromise;
	const original: unknown = await res.json();

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'tenant',
		pageType: PageType.Edit,
		id: tenant.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	const resPromise2 = page.waitForResponse((res) => {
		const u = new URL(res.url());
		return (
			u.href.includes(apiURL) &&
			u.pathname.includes('tenants') &&
			res.request().method() === 'GET'
		);
	});

	await page.getByRole('button', { name: 'Save' }).click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const res2 = await resPromise2;
	const latest: unknown = await res2.json();

	assertUneditedForm(original, latest);
});
