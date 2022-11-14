import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../api/api-fixtures';

test('can be searched', async ({ page, tenant }) => {
	const url = getRoute({
		entity: 'tenant',
		id: tenant.id,
		pageType: PageType.Edit,
		params: {
			organizationId: tenant.organizationId,
		},
	});

	await page.goto(url);

	const input = page.getByLabel('Nationality');

	await input.fill('Kuwa');

	await page.getByTestId('KWT').click();

	await expect(input).toHaveValue('Kuwait');
});
