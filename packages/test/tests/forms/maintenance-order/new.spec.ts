import { expect } from '@playwright/test';
import * as R from 'remeda';

import { maintenanceOrderPartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'maintenanceOrder';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	unit,
	page,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderPartialFactory(),
		FIELDS.maintenanceOrder.required,
	);

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

	await formPage.fillForm(maintenanceOrder);

	await formPage.save();

	await formPage.verifyDetails(maintenanceOrder);

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
	page,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderPartialFactory(),
		FIELDS.maintenanceOrder.all,
	);

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
		...maintenanceOrder,
		categoryId: new ComboboxOption({
			label: maintenanceOrderCategory.labelEn,
			value: maintenanceOrderCategory.id,
		}),
	});

	await formPage.save();

	await formPage.verifyDetails({
		...R.omit(maintenanceOrder, ['categoryId']),
		category: maintenanceOrderCategory.labelEn,
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
