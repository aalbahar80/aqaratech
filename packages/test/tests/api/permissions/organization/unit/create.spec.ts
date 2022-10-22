import { expect } from '@playwright/test';
import { sample, unitFactory } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test('can create unit in own org', async ({ request, org, property }) => {
	const unit = R.pick(
		unitFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		}),
		['portfolioId', 'propertyId', 'type', 'unitNumber'],
	);

	const url = `/organizations/${org.organization.id}/units`;

	const res = await request.post(url, { data: unit });

	expect(res.status()).toBe(201);
});

test('cannot create unit in another org', async ({
	request,
	org,
	property,
}) => {
	const unit = R.pick(
		unitFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		}),
		['portfolioId', 'propertyId', 'type', 'unitNumber'],
	);

	const url = `/organizations/${sample.organizations[0]!.id}/units`;

	const res = await request.post(url, { data: unit });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create unit in non-existing property', async ({
	request,
	org,
	portfolio,
}) => {
	const unit = R.pick(
		unitFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			propertyId: randomUUID(),
		}),
		['portfolioId', 'propertyId', 'type', 'unitNumber'],
	);

	const url = `/organizations/${org.organization.id}/units`;

	const res = await request.post(url, { data: unit });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});
