import { expect } from '@playwright/test';
import * as R from 'remeda';

import { propertyPartialFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'property';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({
	org,
	page,
	portfolio,
}) => {
	const property = R.pick(propertyPartialFactory(), FIELDS.property.required);

	if (!property.area) {
		throw new Error('area is required');
	}

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org, portfolio },
	});

	await formPage.goto();

	await formPage.fillForm({
		...property,
		area: new ComboboxOption({
			label: property.area,
			value: property.area,
		}),
	});

	await formPage.save();

	await formPage.verifyDetails(property);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, page, portfolio }) => {
	const property = R.pick(propertyPartialFactory(), FIELDS.property.all);

	if (!property.area) {
		throw new Error('area is required');
	}

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	// TODO: this might be flaky because of strict mode on label
	await formPage.fillForm({
		...property,
		area: new ComboboxOption({
			label: property.area,
			value: property.area,
		}),
	});
	await formPage.save();

	await formPage.verifyDetails(property);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
