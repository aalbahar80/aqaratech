import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, expenseCategory }) => {
	const original = (
		await prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId: org.organization.id },
		})
	).expenseCategoryTree;

	const url = getRoute({
		entity: 'expenseCategory',
		pageType: PageType.Id,
		id: expenseCategory.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	await page.getByRole('link', { name: 'Edit' }).click();

	const edit = getRoute({
		entity: 'expenseCategory',
		pageType: PageType.Edit,
		id: expenseCategory.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = (
		await prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId: org.organization.id },
		})
	).expenseCategoryTree;

	expect(original).toEqual(latest);
});
