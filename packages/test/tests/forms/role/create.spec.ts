import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

// TODO: add organization to array, after making PageTab.Roles goes to organization roles page
const email = 'test@aqtest.com';

const entities = ['portfolio', 'tenant'] as const;

for (const entity of entities) {
	test(`can invite role to ${entity}`, async ({ page, tenant, portfolio }) => {
		const instance = entity === 'tenant' ? tenant : portfolio;

		const url = getRoute({
			entity,
			id: instance.id,
			pageType: PageTab.Roles,
			params: {
				organizationId: instance.organizationId,
			},
		});

		await page.goto(url);

		await page.getByRole('link', { name: 'New' }).click();

		const formPage = new FormPage(page);

		await formPage.fillForm({ email });

		await formPage.save();

		const successUrl = getRoute({
			entity,
			pageType: PageTab.Roles,
			id: instance.id,
			params: {
				organizationId: instance.organizationId,
			},
		});

		await expect(page).toHaveURL(successUrl);

		const cell = page.getByRole('cell', { name: email });

		await expect(cell).toHaveText(email);
	});
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('can delete role', () => {});
