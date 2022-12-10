import { expect } from '@playwright/test';
import * as R from 'remeda';

import { portfolioFactory } from '@self/seed';
import { PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'portfolio';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	page,
}) => {
	const fields = R.pipe(
		portfolioFactory.build({
			organizationId: portfolio.id,
		}),
		R.pick(['fullName']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: portfolio.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, portfolio, page }) => {
	const fields = R.pipe(
		portfolioFactory.build({
			organizationId: portfolio.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: portfolio.id,
		fixtures: { org, portfolio },
	});
	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
