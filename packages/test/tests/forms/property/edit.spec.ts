import { expect } from '@playwright/test';
import { propertyFactory } from '@self/seed';
import { PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'property';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	property,
	page,
}) => {
	const fields = R.pick(
		propertyFactory.build({
			organizationId: property.organizationId,
			portfolioId: property.portfolioId,
		}),
		['area', 'block', 'number', 'street'],
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: property.id,
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
	property,
	page,
}) => {
	const fields = R.pick(
		propertyFactory.build({
			organizationId: property.organizationId,
			portfolioId: property.portfolioId,
		}),
		['area', 'block', 'number', 'street', 'label', 'avenue', 'parcel', 'paci'],
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: property.id,
		fixtures: { org, portfolio },
	});
	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
