import { expect } from '@playwright/test';
import { roleFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test('can create role in own org', async ({ request, org }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
		}),
		['email'],
	);

	const res = await request.post(
		`/organizations/${org.organization.id}/roles`,
		{ data: role },
	);

	expect(res.status()).toBe(201);
});

test('cannot create role in another org', async ({ request, org }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
		}),
		['email'],
	);

	const res = await request.post(
		`/organizations/${sample.organizations[0]!.id}/roles`,
		{ data: role },
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot create role in non-existing org', async ({ request, org }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
		}),
		['email'],
	);

	const res = await request.post(`/organizations/${randomUUID()}/roles`, {
		data: role,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot create role with invalid email', async ({ request, org }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
			email: 'invalid-email',
		}),
		['email'],
	);

	const res = await request.post(
		`/organizations/${org.organization.id}/roles`,
		{ data: role },
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);

	expect(await res.json()).toHaveProperty('fieldErrors.email');
});
