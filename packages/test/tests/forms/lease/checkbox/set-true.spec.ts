import { expect } from '@playwright/test';

import { getLabel, PageType } from '@self/utils';

import { test } from '../../../api/api-fixtures';
import { FormPage } from '../../form-page-model';

const entity = 'lease';
const pageType = PageType.Edit;

test.use({
	leasesParams: [
		{
			canPay: false,
			notify: false,
		},
	],
});

test('can set to true', async ({ org, portfolio, lease, page }) => {
	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: lease.id,
		fixtures: { org, portfolio },
	});

	const fields = {
		canPay: true,
		notify: true,
	};

	await formPage.goto();

	await expect(page.getByLabel(getLabel('canPay'))).not.toBeChecked();
	await expect(page.getByLabel(getLabel('notify'))).not.toBeChecked();

	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
