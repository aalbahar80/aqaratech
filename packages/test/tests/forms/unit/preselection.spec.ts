import { expect } from '@playwright/test';

import { getLabel, getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

test('unitType is preselected', async ({ page, unit }) => {
	const url = getRoute({
		entity: 'unit',
		pageType: PageType.Edit,
		id: unit.id,
		params: {
			organizationId: unit.organizationId,
			portfolioId: unit.portfolioId,
		},
	});

	await page.goto(url);

	const el = page.getByLabel(getLabel('type'));

	if (!unit.type) {
		throw new Error('unit.type is not defined');
	}

	await expect(el).toHaveValue(unit.type);
});
