import { expect } from '@playwright/test';
import { propertyPartialFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'property';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	property,
	page,
}) => {
	const fields = R.pick(propertyPartialFactory(), FIELDS.property.required);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: property.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm({
		...fields,
		area: new ComboboxOption({
			label: fields.area,
			value: fields.area,
		}),
	});
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({
	org,
	portfolio,
	property,
	page,
}) => {
	const fields = R.pick(propertyPartialFactory(), FIELDS.property.all);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: property.id,
		fixtures: { org, portfolio },
	});
	await formPage.goto();
	await formPage.fillForm({
		...fields,
		area: new ComboboxOption({
			label: fields.area,
			value: fields.area,
		}),
	});
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
