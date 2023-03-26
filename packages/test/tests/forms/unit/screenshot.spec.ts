import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, unit }) => {
	const original = await prisma.unit.findUniqueOrThrow({
		where: { id: unit.id },
	});

	const edit = getRoute({
		entity: 'unit',
		pageType: PageType.Edit,
		id: unit.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	const url = getRoute({
		entity: 'unit',
		pageType: PageType.Id,
		id: unit.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.unit.findUniqueOrThrow({
		where: { id: unit.id },
	});

	assertUneditedForm(original, latest);
});
