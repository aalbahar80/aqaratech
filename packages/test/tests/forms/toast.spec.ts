import { expect } from '@playwright/test';

import { PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

import { FormPage } from './form-page-model';

const entity = 'portfolio';
const pageType = PageType.Edit;

test.describe('Form toasts', () => {
	test('success', async ({ org, portfolio, page }) => {
		const formPage = new FormPage(page, {
			entity,
			pageType,
			id: portfolio.id,
			fixtures: { org, portfolio },
		});

		await formPage.goto();

		// Avoid formPage.save() because it waits for a response
		await formPage.saveButton.click();

		const toast = page.getByRole('status');

		// loading is too fast to test
		// const loading = toast.getByText('Loading');
		// await expect(loading).toBeVisible();
		// await expect(loading).toBeHidden();

		const success = toast.getByText('Success');
		await expect(success).toBeVisible();
		await expect(success).toBeHidden();
	});

	test('invalid', async ({ org, portfolio, page }) => {
		const formPage = new FormPage(page, {
			entity,
			pageType,
			id: portfolio.id,
			fixtures: { org, portfolio },
		});

		await formPage.goto();
		// Enter invalid data
		await formPage.fillForm({ fullName: '' });

		// Avoid formPage.save() because it waits for a response
		await formPage.saveButton.click();

		const toast = page.getByRole('status');

		// loading is too fast to test
		// const loading = toast.getByText('Loading');
		// await expect(loading).toBeVisible();
		// await expect(loading).toBeHidden();

		const invalid = toast.getByText('Invalid form');
		await expect(invalid).toBeVisible();

		// PERF: waiting for invalid toast to disappear takes too long
		// await expect(invalid).toBeHidden({
		// 	timeout: 7000, // invalid toasts stay for a bit longer
		// });
	});
});
