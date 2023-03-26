import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, property }) => {
	const url = getRoute({
		entity: 'property',
		pageType: PageType.Id,
		id: property.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		},
	});

	const original = await prisma.property.findUniqueOrThrow({
		where: { id: property.id },
	});

	const edit = getRoute({
		entity: 'property',
		pageType: PageType.Edit,
		id: property.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		},
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.property.findUniqueOrThrow({
		where: { id: property.id },
	});

	assertUneditedForm(original, latest);
});
