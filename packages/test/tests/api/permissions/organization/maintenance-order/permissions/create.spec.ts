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

test('must specify unit if tenant is specified', async ({
	request,
	org,
	portfolio,
	property,
}) => {
	const maintenanceOrder = R.pick(
		maintenanceOrderFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			propertyId: property.id,
			tenantId: randomUUID(),
		}),
		FIELDS,
	);

	const url = getUrl(org.organization.id);

	const res = await request.post(url, { data: maintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('fieldErrors', {
		unitId: ['Unit must be specified if tenant is specified.'],
	});
});

test.describe('tenant can create maintenance order', () => {
	test.use({ userRoleType: 'TENANT' });

	test('with own id', async ({ request, org, tenant, unit }) => {
		const maintenanceOrder = R.pick(
			maintenanceOrderFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				unitId: unit.id,
				// tenantId: randomUUID(),
				tenantId: tenant.id,
			}),
			FIELDS,
		);

		const url = getUrl(org.organization.id);

		const res = await request.post(url, { data: maintenanceOrder });

		expect(res.status()).toBe(201);
	});

	test('not with null tenantId', async ({ request, org, unit }) => {
		const maintenanceOrder = R.pick(
			maintenanceOrderFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				unitId: unit.id,
				tenantId: null,
			}),
			FIELDS,
		);

		const url = getUrl(org.organization.id);

		const res = await request.post(url, { data: maintenanceOrder });

		expect(res.status()).toBe(403);
	});

	test('not with incorrect id', async ({ request, org, unit }) => {
		const maintenanceOrder = R.pick(
			maintenanceOrderFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				unitId: unit.id,
				tenantId: randomUUID(),
			}),
			FIELDS,
		);

		const url = getUrl(org.organization.id);

		const res = await request.post(url, { data: maintenanceOrder });

		expect(res.status()).toBe(403);
	});

	test('not without unitId', async ({ request, org, unit }) => {
		const maintenanceOrder = R.pick(
			maintenanceOrderFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				unitId: null,
				tenantId: randomUUID(),
			}),
			FIELDS,
		);

		const url = getUrl(org.organization.id);

		const res = await request.post(url, { data: maintenanceOrder });

		expect(res.status()).toBe(400);

		const body: unknown = await res.json();

		expect(body).toHaveProperty('fieldErrors', {
			unitId: ['Unit must be specified if tenant is specified.'],
		});
	});
});
