import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../../api/api-fixtures';

const inputs = ['tenant', 'portfolio', 'organization'] as const;

for (const input of inputs) {
	test(`create ${input} role button has predefined params`, async ({
		page,
		org,
		portfolio,
		tenant,
	}) => {
		const entities = {
			organization: org.organization,
			portfolio,
			tenant,
		};

		const entity = entities[input];

		const id = entity.id;

		// @ts-expect-error BUG: typecript 5.1.3
		const url = getRoute({
			entity: input,
			id: id,
			pageType: PageTab.Roles,
			params: {
				organizationId: org.organization.id,
			},
		});

		const form = resolveURL(
			'/en',
			'/organizations',
			org.organization.id,
			'roles',
			'new',
			`?relationKey=${input}&relationValue=${id}`,
		);

		await page.goto(url);

		const btn = page.getByRole('link', { name: 'New' });

		await expect(btn).toHaveAttribute('href', form);

		await btn.click();

		await expect(page).toHaveURL(form);
	});
}
