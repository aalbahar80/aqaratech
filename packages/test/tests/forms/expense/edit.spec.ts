import { expect } from '@playwright/test';
import { expensePartialFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'expense';
const pageType = PageType.Edit;

test.use({
	expenseCategoryParams: {
		isGroup: false,
	},
});

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	expense,
	page,
}) => {
	const fields = R.pick(expensePartialFactory(), FIELDS.expense.required);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: expense.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({
	org,
	portfolio,
	expense,
	expenseCategory,
	page,
}) => {
	const fields = R.pick(expensePartialFactory(), FIELDS.expense.all);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: expense.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();

	await formPage.fillForm({
		...fields,
		categoryId: new ComboboxOption({
			label: expenseCategory.labelEn,
			value: expenseCategory.id,
		}),
	});

	await formPage.save();

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
