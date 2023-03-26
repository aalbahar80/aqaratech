import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, lease }) => {
	const original = await prisma.lease.findUniqueOrThrow({
		where: { id: lease.id },
	});

	const url = getRoute({
		entity: 'lease',
		pageType: PageType.Id,
		id: lease.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	const edit = getRoute({
		entity: 'lease',
		pageType: PageType.Edit,
		id: lease.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.lease.findUniqueOrThrow({
		where: { id: lease.id },
	});

	assertUneditedForm(original, latest);
});
