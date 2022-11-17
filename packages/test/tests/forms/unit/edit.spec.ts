import { expect } from '@playwright/test';
import { unitFactory } from '@self/seed';
import { PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'unit';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	unit,
	page,
}) => {
	const fields = R.pick(
		unitFactory.build({
			organizationId: '',
			portfolioId: '',
			propertyId: '',
		}),
		['unitNumber'],
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: unit.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({
	org,
	portfolio,
	unit,
	page,
}) => {
	const fields = R.pick(
		unitFactory.build({
			organizationId: '',
			portfolioId: '',
			propertyId: '',
		}),
		[
			'unitNumber',
			'bed',
			'bath',
			'size',
			'marketRent',
			'floor',
			'label',
			'type',
			'usage',
		],
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: unit.id,
		fixtures: { org, portfolio },
	});
	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
