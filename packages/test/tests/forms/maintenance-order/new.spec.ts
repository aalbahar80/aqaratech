import { expect } from '@playwright/test';
import * as R from 'remeda';

import { maintenanceOrderPartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { fromApi } from '../../../utils/matchers/unedited-form';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
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

	const post = page.waitForResponse(fromApi);

	await formPage.save();

	const res: unknown = await post.then(
		async (data) => (await data.json()) as unknown,
	);

	expect(res).toMatchObject({
		...maintenanceOrder,
		unitId: unit.id,
		propertyId: null,
		tenantId: null,
	});

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

	await formPage.fillForm(maintenanceOrder);

	const post = page.waitForResponse(fromApi);

	await formPage.save();

	const res: unknown = await post.then(
		async (data) => (await data.json()) as unknown,
	);

	expect(res).toMatchObject({
		...maintenanceOrder,
		completedAt: new Date(maintenanceOrder.completedAt!).toISOString(),
		unitId: unit.id,
		propertyId: null,
		tenantId: null,
	});

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
