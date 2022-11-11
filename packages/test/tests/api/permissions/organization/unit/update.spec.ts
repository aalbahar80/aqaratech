import { expect } from '@playwright/test';
import { sample, unitFactory } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

const newUnit = R.pick(
	unitFactory.build({
		organizationId: '',
		portfolioId: '',
		propertyId: '',
	}),
	['type', 'unitNumber', 'bed', 'bath', 'size', 'marketRent', 'usage'],
);

test('can update unit in own org', async ({ request, unit }) => {
	const res = await request.patch(`/units/${unit.id}`, {
		data: newUnit,
	});

	expect(res.status()).toBe(200);
});

test('cannot update unit in another org', async ({ request, org: _org }) => {
	const res = await request.patch(`/units/${sample.units[0].id}`, {
		data: newUnit,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing unit', async ({ request }) => {
	const res = await request.patch(`/units/${randomUUID()}`, {
		data: newUnit,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
