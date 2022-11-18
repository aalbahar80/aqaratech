import { expect } from '@playwright/test';
import { expenseCategoryFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'expenseCategory';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	property,
	page,
}) => {
	const expenseCategory = R.pick(
		expenseCategoryFactory.build(),
		FIELDS.expenseCategory.required,
	);

	const url = getRoute({
		entity,
		pageType,
		predefined: { propertyId: property.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm(expenseCategory);
	await formPage.save();

	await formPage.verifyDetails(expenseCategory);

	const successUrl = getRoute({
		entity,
		id: ':uuid',
		pageType: PageType.Id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await expect(page).toHaveURL(uuid(successUrl));
});

test('can be submitted with all fields', async ({ org, page }) => {
	const expenseCategory = R.pick(
		expenseCategoryFactory.build(),
		FIELDS.expenseCategory.all,
	);

	const url = getRoute({
		entity,
		pageType,
		params: {
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm(expenseCategory);
	await formPage.save();

	await formPage.verifyDetails(expenseCategory);

	const successUrl = getRoute({
		entity,
		id: ':uuid',
		pageType: PageType.Id,
		params: {
			organizationId: org.organization.id,
		},
	});

	await expect(page).toHaveURL(uuid(successUrl));
});
