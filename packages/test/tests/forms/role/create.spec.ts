import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const email = 'test@aqtest.com';

const entities = ['organization', 'portfolio', 'tenant'] as const;

for (const entity of entities) {
	test(`can invite role to ${entity}`, async ({
		page,
		org,
		tenant,
		portfolio,
	}) => {
		// get url to roles page
		let id: string;
		let params: Record<string, string> = {};

		switch (entity) {
			case 'organization':
				id = org.organization.id;
				break;
			case 'portfolio':
				id = portfolio.id;
				params = { organizationId: portfolio.organizationId };
				break;
			case 'tenant':
				id = tenant.id;
				params = { organizationId: tenant.organizationId };
				break;
			default:
				throw new Error('entity not found');
		}

		// @ts-expect-error BUG: typecript 5.1.3
		const url = getRoute({
			entity,
			id,
			pageType: PageTab.Roles,
			params,
		});

		await page.goto(url);

		await page.getByRole('link', { name: 'New' }).click();

		const formPage = new FormPage(page);

		await formPage.fillForm({ email });

		await formPage.save();

		// @ts-expect-error BUG: typecript 5.1.3
		const successUrl = getRoute({
			entity,
			pageType: PageTab.Roles,
			id,
			params,
		});

		await expect(page).toHaveURL(successUrl, { timeout: 10000 });

		const cell = page.getByRole('cell', { name: email });

		await expect(cell).toHaveText(email);

		// ### Manually send invite ###

		const responsePromise = page.waitForResponse((res) =>
			res.url().includes('send-invite'),
		);

		// find the row with the test email
		const btn = page
			.getByRole('row')
			.filter({
				hasText: email,
			})
			.getByRole('button', { name: 'Send Invite' });

		await btn.click();

		const response = await responsePromise;

		expect(response.status()).toBe(201);

		const body = await response.text();

		// check email was sent
		expect(body).toStrictEqual(email);
	});
}
