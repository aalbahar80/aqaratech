import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { maintenanceOrderFactory, sample } from '@self/seed';

import { test } from '../../../../api-fixtures';

const FIELDS = [
	'portfolioId',
	'propertyId',
	'unitId',
	'tenantId',
	'title',
	'description',
	'status',
	'completedAt',
] as const;

const getUrl = (orgId: string) => `/organizations/${orgId}/maintenance-orders`;

test('can create maintenanceOrder in own org', async ({
	request,
	org,
	property,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		}),
		FIELDS,
	);

	const url = getUrl(org.organization.id);

	const res = await request.post(url, { data: maintenanceOrder });

	expect(res.status()).toBe(201);
});

test('cannot create maintenanceOrder in another org', async ({
	request,
	org,
	property,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		}),
		FIELDS,
	);

	const url = getUrl(sample.organizations[0].id);

	const res = await request.post(url, { data: maintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create maintenanceOrder in non-existing portfolio', async ({
	request,
	org,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderFactory.build({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
		}),
		FIELDS,
	);

	const url = getUrl(org.organization.id);

	const res = await request.post(url, { data: maintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create maintenanceOrder in non-existing property', async ({
	request,
	org,
	portfolio,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			propertyId: randomUUID(),
		}),
		FIELDS,
	);

	const url = getUrl(org.organization.id);

	const res = await request.post(url, { data: maintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create maintenanceOrder in non-existing unit', async ({
	request,
	org,
	portfolio,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: randomUUID(),
		}),
		FIELDS,
	);

	const url = getUrl(org.organization.id);

	const res = await request.post(url, { data: maintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
