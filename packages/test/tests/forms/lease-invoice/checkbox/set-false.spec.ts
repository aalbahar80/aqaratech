import { expect } from '@playwright/test';

import { getLabel, getRoute, PageType } from '@self/utils';

import { test } from '../../../api/api-fixtures';
import { FormPage } from '../../form-page-model';

const entity = 'leaseInvoice';
const pageType = PageType.Edit;

test.use({
	invoicesParams: [
		{
			isPaid: true,
			postAt: '2020-01-01',
		},
	],
});

test('can set to false', async ({ org, portfolio, invoice, page }) => {
	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: invoice.id,
		fixtures: { org, portfolio },
	});

	const fields = {
		isPaid: false,
		paidAt: null,
	};

	await formPage.goto();

	await expect(page.getByLabel(getLabel('isPaid'))).toBeChecked();

	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('badge updates with value', async ({ org, portfolio, invoice, page }) => {
	const url = getRoute({
		entity,
		pageType: PageType.Id,
		id: invoice.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url);

	const badge = page.getByTestId('badge');

	await expect(badge).toHaveText('Paid');

	await page.getByRole('link', { name: 'Edit' }).click();

	// update invoice to be paid

	const formPage = new FormPage(page);

	const fields = {
		isPaid: false,
		paidAt: null,
	};

	await formPage.fillForm(fields);

	await formPage.save();

	// badge should update

	await expect(badge).toHaveText('Unpaid');
});
