import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, invoice }) => {
	const original = await prisma.leaseInvoice.findUniqueOrThrow({
		where: { id: invoice.id },
	});

	const url = getRoute({
		entity: 'leaseInvoice',
		pageType: PageType.Id,
		id: invoice.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	const edit = getRoute({
		entity: 'leaseInvoice',
		pageType: PageType.Edit,
		id: invoice.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.leaseInvoice.findUniqueOrThrow({
		where: { id: invoice.id },
	});

	assertUneditedForm(original, latest);
});
