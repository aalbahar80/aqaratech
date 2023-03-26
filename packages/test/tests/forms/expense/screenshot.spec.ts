import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio, expense }) => {
	const original = await prisma.expense.findUniqueOrThrow({
		where: { id: expense.id },
	});

	const url = getRoute({
		entity: 'expense',
		pageType: PageType.Id,
		id: expense.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	const edit = getRoute({
		entity: 'expense',
		pageType: PageType.Edit,
		id: expense.id,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.expense.findUniqueOrThrow({
		where: { id: expense.id },
	});

	assertUneditedForm(original, latest);
});
