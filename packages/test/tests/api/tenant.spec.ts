import { expect } from '@playwright/test';
import { tenantFactory } from '@self/seed';
import * as R from 'remeda';
import type { TenantDto } from '../../types/api';
import { test } from './api-fixtures';

test(`can't be created without fullName`, async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['label'],
	);

	const res = await request.post(
		`/organizations/${org.organization.id}/tenants`,
		{
			data: tenant,
		},
	);

	await expect(res).not.toBeOK();

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('fieldErrors', {
		fullName: ['Required'],
	});
});

test(`can't be created with additional properties`, async ({
	request,
	org,
}) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);

	const res = await request.post(
		`/organizations/${org.organization.id}/tenants`,
		{
			data: {
				...tenant,
				abc: 123,
			},
		},
	);

	await expect(res).not.toBeOK();

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('formErrors', [
		"Unrecognized key(s) in object: 'abc'",
	]);
});

test(`can be created with minimal fields`, async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);

	const res = await request.post(
		`/organizations/${org.organization.id}/tenants`,
		{
			data: tenant,
		},
	);

	await expect(res).toBeOK();
	expect(res.status()).toBe(201);
});

test(`can update fullName only`, async ({ request, tenant }) => {
	const res = await request.patch(`/tenants/${tenant.id}`, {
		data: {
			organizationId: tenant.organizationId,
			fullName: 'Test Tenant',
		},
	});

	await expect(res).toBeOK();
});

test(`can update single field only`, async ({ request, tenant }) => {
	const res = await request.patch(`/tenants/${tenant.id}`, {
		data: {
			organizationId: tenant.organizationId,
			label: 'Test Tenant label',
		},
	});

	await expect(res).toBeOK();
});

test(`returns title field`, async ({ request, tenant }) => {
	const res = await request.get(`/tenants/${tenant.id}`);

	const data = (await res.json()) as TenantDto;
	expect.soft(data).toHaveProperty('fullName');
	expect(data).toHaveProperty('title');
});

test(`fullName is trimmed`, async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		['organizationId', 'fullName'],
	);

	const res = await request.post(
		`/organizations/${org.organization.id}/tenants`,
		{
			data: {
				...tenant,
				fullName: ` ${tenant.fullName} `,
			},
		},
	);

	const data = (await res.json()) as TenantDto;

	expect.soft(data).toHaveProperty('fullName');

	expect(data.fullName).toBe(tenant.fullName.trim());
});
