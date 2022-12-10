import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { propertyFactory, sample } from '@self/seed';

import { test } from '../../../api-fixtures';

const newProperty = R.pick(
	propertyFactory.build({
		organizationId: '',
		portfolioId: '',
	}),
	['area', 'block', 'street', 'number'],
);

test('can update property in own org', async ({ request, property }) => {
	const res = await request.patch(`/properties/${property.id}`, {
		data: newProperty,
	});

	expect(res.status()).toBe(200);
});

test('cannot update property in another org', async ({
	request,
	org: _org,
}) => {
	const res = await request.patch(`/properties/${sample.properties[0].id}`, {
		data: newProperty,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing property', async ({ request }) => {
	const res = await request.patch(`/properties/${randomUUID()}`, {
		data: newProperty,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
