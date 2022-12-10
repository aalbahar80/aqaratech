import { expect } from '@playwright/test';

import { getLabel, PageType } from '@self/utils';

import { test } from '../../../api/api-fixtures';
import { FormPage } from '../../form-page-model';

const entity = 'lease';
const pageType = PageType.Edit;

test.use({
	leasesParams: [
		{
			canPay: true,
			notify: true,
		},
	],
});

test('can set to false', async ({ org, portfolio, lease, page }) => {
	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: lease.id,
		fixtures: { org, portfolio },
	});

	const fields = {
		canPay: false,
		notify: false,
	};

	await formPage.goto();

	await expect(page.getByLabel(getLabel('canPay'))).toBeChecked();
	await expect(page.getByLabel(getLabel('notify'))).toBeChecked();

	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
