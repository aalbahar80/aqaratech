/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expensePartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'expense';
const pageType = PageType.New;

test.use({
	expenseCategoryParams: {
		isGroup: false,
	},
});

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	unit,
	page,
	expenseCategory: _expenseCategory,
}) => {
	const expense = R.pick(expensePartialFactory(), FIELDS.expense.required);

	const url = getRoute({
		entity,
		pageType,
		predefined: { unitId: unit.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm(expense);

	await formPage.save();

	await formPage.verifyDetails(expense);

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

test('can be submitted with all fields', async ({
	org,
	portfolio,
	unit,
	expenseCategory,
	page,
}) => {
	const expense = R.pick(expensePartialFactory(), FIELDS.expense.all);

	const url = getRoute({
		entity,
		pageType,
		predefined: { unitId: unit.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm({
		...expense,
		categoryId: new ComboboxOption({
			label: expenseCategory.labelEn,
			value: expenseCategory.id,
		}),
	});

	await formPage.save();

	await formPage.verifyDetails({
		...R.omit(expense, ['categoryId']),
		category: expenseCategory.labelEn,
	});

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
