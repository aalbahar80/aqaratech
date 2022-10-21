import { expect } from '@playwright/test';
import { propertyFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test('can update property in own org', async ({
	request,
	org,
	portfolio,
	property,
}) => {
	const newProperty = R.pick(
		propertyFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		}),
		['area', 'block', 'street', 'number'],
	);

	const res = await request.patch(`/properties/${property.id}`, {
		data: newProperty,
	});

	expect(res.status()).toBe(200);
});

test('cannot update property in another org', async ({
	request,
	org: _org,
}) => {
	const res = await request.patch(`/properties/${sample.properties[0]!.id}`, {
		data: {
			fullName: 'should not work',
		},
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing property', async ({ request }) => {
	const res = await request.patch(`/properties/${randomUUID()}`, {
		data: {
			fullName: 'should not work',
		},
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
