import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';

import { sample } from '@self/seed';

import { test } from '../../../api-fixtures';

test('can invite role in own org', async ({ request, org, role }) => {
	const res = await request.post(
		`/organizations/${org.organization.id}/roles/${role.id}/send-invite`,
	);

	expect(res.status()).toBe(201);
});

test('cannot invite role in another org', async ({ request, org: _org }) => {
	const res = await request.post(
		`/organizations/${sample.organizations[0].id}/roles/${sample.roles[0].id}/send-invite`,
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot invite role in non-existing org', async ({
	request,
	org: _org,
	role,
}) => {
	const res = await request.post(
		`/organizations/${randomUUID()}/roles/${role.id}/send-invite`,
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});
