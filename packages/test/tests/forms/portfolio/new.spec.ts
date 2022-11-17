import { expect } from '@playwright/test';
import { portfolioFactory } from '@self/seed';
import { PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'portfolio';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({ org, page }) => {
	const portfolio = R.pipe(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(portfolio);
	await formPage.save();

	await formPage.verifyDetails(portfolio);
	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, page }) => {
	const portfolio = R.pipe(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(portfolio);
	await formPage.save();

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
