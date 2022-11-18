import { expect } from '@playwright/test';
import { getLabel, PageType } from '@self/utils';
import { test } from '../../../api/api-fixtures';
import { FormPage } from '../../form-page-model';

const entity = 'leaseInvoice';
const pageType = PageType.Edit;

test.use({
	invoicesParams: [
		{
			isPaid: true,
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
