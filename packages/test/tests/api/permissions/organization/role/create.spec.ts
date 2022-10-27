import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { test } from '../../../api-fixtures';

test('can create role in own org', async ({ request, org }) => {
	const email = faker.internet.email();

	const res = await request.post(
		`/organizations/${org.organization.id}/roles`,
		{ data: { email } },
	);

	expect(res.status()).toBe(201);
});

test('cannot create role in another org', async ({ request, org: _org }) => {
	const email = faker.internet.email();

	const res = await request.post(
		`/organizations/${sample.organizations[0]!.id}/roles`,
		{ data: { email } },
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot create role in non-existing org', async ({
	request,
	org: _org,
}) => {
	const email = faker.internet.email();

	const res = await request.post(`/organizations/${randomUUID()}/roles`, {
		data: { email },
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot create role with invalid email', async ({ request, org }) => {
	const res = await request.post(
		`/organizations/${org.organization.id}/roles`,
		{ data: { email: 'invalid-email' } },
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);

	expect(await res.json()).toHaveProperty('fieldErrors.email');
});
