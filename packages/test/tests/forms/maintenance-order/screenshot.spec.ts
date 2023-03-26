import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({
	page,
	org,
	portfolio,
	maintenanceOrder,
}) => {
	const url = getRoute({
		entity: 'maintenanceOrder',
		pageType: PageType.Id,
		id: maintenanceOrder.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	const original = await prisma.maintenanceOrder.findUniqueOrThrow({
		where: { id: maintenanceOrder.id },
	});

	const edit = getRoute({
		entity: 'maintenanceOrder',
		pageType: PageType.Edit,
		id: maintenanceOrder.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.maintenanceOrder.findUniqueOrThrow({
		where: { id: maintenanceOrder.id },
	});

	assertUneditedForm(original, latest);
});
