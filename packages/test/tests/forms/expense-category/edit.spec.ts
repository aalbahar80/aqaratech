import { expect } from '@playwright/test';
import { expenseCategoryFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'expenseCategory';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	expenseCategory,
	page,
}) => {
	const fields = R.pick(
		expenseCategoryFactory.build(),
		R.reject(FIELDS.expenseCategory.required, (f) => f === 'isGroup'),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: expenseCategory.id,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({
	org,
	expenseCategory,
	page,
}) => {
	const fields = R.pick(
		expenseCategoryFactory.build(),
		R.reject(FIELDS.expenseCategory.all, (f) => f === 'isGroup'),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: expenseCategory.id,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
