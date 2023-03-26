import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	const original = await prisma.portfolio.findUniqueOrThrow({
		where: { id: portfolio.id },
	});

	const edit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Edit,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.portfolio.findUniqueOrThrow({
		where: { id: portfolio.id },
	});

	assertUneditedForm(original, latest);
});
