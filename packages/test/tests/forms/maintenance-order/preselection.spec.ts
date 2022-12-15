import { expect } from '@playwright/test';

import { getLabel, getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

test('status is preselected', async ({ page, maintenanceOrder }) => {
	const url = getRoute({
		entity: 'maintenanceOrder',
		pageType: PageType.Edit,
		id: maintenanceOrder.id,
		params: {
			organizationId: maintenanceOrder.organizationId,
			portfolioId: maintenanceOrder.portfolioId,
		},
	});

	await page.goto(url);

	const el = page.getByLabel(getLabel('status'));

	await expect(el).toHaveValue(maintenanceOrder.status);
});
