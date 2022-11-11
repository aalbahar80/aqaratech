import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { test } from '../../../api-fixtures';

test('can delete role in own org', async ({ request, org, role }) => {
	const res = await request.delete(
		`/organizations/${org.organization.id}/roles/${role.id}`,
	);

	expect(res.status()).toBe(200);
});

test('cannot delete role in another org', async ({ request, org: _org }) => {
	const res = await request.delete(
		`/organizations/${sample.organizations[0].id}/roles/${sample.roles[0]!.id}`,
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot delete role in non-existing org', async ({
	request,
	org: _org,
	role,
}) => {
	const res = await request.delete(
		`/organizations/${randomUUID()}/roles/${role.id}`,
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});
