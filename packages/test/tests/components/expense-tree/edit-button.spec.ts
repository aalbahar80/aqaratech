import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { PageTab, getLabel, getRoute } from '@self/utils';

import { test } from './tree.fixture';

test('icon links to details page', async ({ page }) => {
	const name = 'Fire Fighting Contract';

	const view = page
		.getByText('Fire Fighting Contract')
		.getByRole('link', { name: 'View' });

	await view.click();

	// Go to edit page

	await page.getByRole('link', { name: 'Edit' }).click();

	// expect page to have url ending with /edit
	const re = /.*\/edit$/;
	await expect(page).toHaveURL(re);

	const labelEn = page.getByLabel('Label En');
	await expect(labelEn).toHaveValue(name);
});

test.describe('expense category group', () => {
	test.use({
		expenseCategoryParams: { isGroup: true, labelEn: 'Test Group' },
	});

	test('add button links to form', async ({ page, org, expenseCategory }) => {
		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageTab.ExpenseCategories,
			params: {},
		});

		await page.waitForTimeout(1000);
		await page.reload(); // reload to give a chance for category to show up (created using api)

		const btn = page
			.getByRole('listitem')
			.filter({ hasText: 'Test Group' })
			.getByRole('link', { name: 'Add child' });

		await expect(btn).toBeVisible();

		await expect
			.soft(btn)
			.toHaveAttribute(
				'href',
				resolveURL(
					'/en',
					'/organizations',
					org.organization.id,
					'expense-categories',
					'/new',
					`?parentId=${expenseCategory.id}`,
				),
			);

		await btn.click();

		const labelEn = page.getByLabel(getLabel('labelEn'));

		await labelEn.fill('Test Child');

		await page.getByRole('button', { name: 'Save' }).click();

		await page.waitForTimeout(1000);
		await page.goto(url);

		await expect.soft(page.getByText('Test Child')).toBeVisible();

		// check that child is added to correct parent

		await expect(
			page
				.getByRole('listitem')
				.filter({ hasText: 'Test Group' })
				.getByText('Test Child'),
		).toBeVisible();
	});
});
