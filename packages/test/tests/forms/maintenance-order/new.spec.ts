import { expect } from '@playwright/test';
import * as R from 'remeda';

import { maintenanceOrderPartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
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

	const created = await prisma.maintenanceOrder.findFirstOrThrow({
		where: { organizationId: org.organization.id },
	});

	expect(created).toMatchObject({
		...maintenanceOrder,
		unitId: unit.id,
		propertyId: null,
		tenantId: null,
	});
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

	const created = await prisma.maintenanceOrder.findFirstOrThrow({
		where: { organizationId: org.organization.id },
	});

	expect(created).toMatchObject({
		...maintenanceOrder,
		completedAt: new Date(maintenanceOrder.completedAt!),
		unitId: unit.id,
		propertyId: null,
		tenantId: null,
	});
});
