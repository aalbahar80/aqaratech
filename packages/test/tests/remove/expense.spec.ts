import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../prisma';
import { test } from '../api/api-fixtures';
import { IdPage } from '../models/id-page';

test('delete expense', async ({ page, org, expense }) => {
	const url = getRoute({
		entity: 'expense',
		pageType: PageType.Id,
		id: expense.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: expense.portfolioId,
		},
	});

	await page.goto(url);

	const responsePromise = page.waitForResponse(
		(res) => res.request().method() === 'DELETE',
	);

	const idPage = new IdPage({ page });
	await idPage.delete();
	await responsePromise;

	const deleted = await prisma.expense.findUnique({
		where: { id: expense.id },
	});

	expect(deleted).toBeNull();
});
