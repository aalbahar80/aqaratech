import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseFactory, sample } from '@self/seed';

import { test } from '../../../../api-fixtures';

test('can create expense in own org', async ({ request, org, property }) => {
	const expense = R.pick(
		expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		}),
		['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
	);

	const url = `/organizations/${org.organization.id}/expenses`;

	const res = await request.post(url, { data: expense });

	expect(res.status()).toBe(201);
});

test('cannot create expense in another org', async ({
	request,
	org,
	property,
}) => {
	const expense = R.pick(
		expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		}),
		['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
	);

	const url = `/organizations/${sample.organizations[0].id}/expenses`;

	const res = await request.post(url, { data: expense });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create expense in non-existing portfolio', async ({
	request,
	org,
}) => {
	const expense = R.pick(
		expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
		}),
		['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
	);

	const url = `/organizations/${org.organization.id}/expenses`;

	const res = await request.post(url, { data: expense });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create expense in non-existing property', async ({
	request,
	org,
	portfolio,
}) => {
	const expense = R.pick(
		expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			propertyId: randomUUID(),
		}),
		['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
	);

	const url = `/organizations/${org.organization.id}/expenses`;

	const res = await request.post(url, { data: expense });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot create expense in non-existing unit', async ({
	request,
	org,
	portfolio,
}) => {
	const expense = R.pick(
		expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: randomUUID(),
		}),
		['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
	);

	const url = `/organizations/${org.organization.id}/expenses`;

	const res = await request.post(url, { data: expense });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
