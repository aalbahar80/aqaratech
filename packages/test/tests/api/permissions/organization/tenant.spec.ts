import { expect } from '@playwright/test';
import { sample, tenantFactory } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../api-fixtures';

test('can create tenant in own org', async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);
	const res = await request.post(
		`/organizations/${org.organization.id}/tenants`,
		{ data: tenant },
	);

	expect(res.status()).toBe(201);
});

test('cannot create tenant in another org', async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);
	const res = await request.post(
		`/organizations/${sample.organizations[0]!.id}/tenants`,
		{ data: tenant },
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create tenant in non-existing org', async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);
	const res = await request.post(`/organizations/${randomUUID()}/tenants`, {
		data: tenant,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // won't pass guard
});
