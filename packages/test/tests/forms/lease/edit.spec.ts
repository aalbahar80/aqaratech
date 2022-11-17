import { expect } from '@playwright/test';
import { leasePartialFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'lease';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	lease,
	page,
}) => {
	const fields = R.pick(leasePartialFactory(), FIELDS.lease.required);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: lease.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test.fixme(
	'can be submitted with all fields',
	async ({ org, portfolio, lease, page }) => {
		const fields = R.pick(leasePartialFactory(), FIELDS.lease.all);

		const formPage = new FormPage(page, {
			entity,
			pageType,
			id: lease.id,
			fixtures: { org, portfolio },
		});

		await formPage.goto();
		await formPage.fillForm(fields);
		await formPage.save();

		await formPage.verifyDetails(fields);

		await expect(page).toHaveURL(formPage.getSuccessUrl());
	},
);
