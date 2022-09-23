import { sample, testOrgRoleId } from '@self/seed';
import { expect, test } from '../../token';

test.use({
	extraHTTPHeaders: {
		'x-role-id': testOrgRoleId,
	},
});

const organizationId = sample.organizations[0].id;
const tenant = sample.tenants[1];

test(`can't be created without orgId`, async ({ request, token }) => {
	const res = await request.post(`/tenants`, {
		headers: { Authorization: `Bearer ${token}` },
		data: {
			fullName: 'Test Tenant',
		},
	});

	await expect(res).not.toBeOK();
	expect(res.status()).toBe(400);
});

test(`can't be created without fullName`, async ({ request, token }) => {
	const res = await request.post(`/tenants`, {
		headers: { Authorization: `Bearer ${token}` },
		data: {
			organizationId,
		},
	});

	await expect(res).not.toBeOK();
	expect(res.status()).toBe(400);
});

test(`can be created with minimal fields`, async ({ request, token }) => {
	const res = await request.post(`/tenants`, {
		headers: { Authorization: `Bearer ${token}` },
		data: {
			fullName: 'Test Tenant',
			organizationId,
		},
	});

	await expect(res).toBeOK();
	expect(res.status()).toBe(201);
});

test(`can update fullName only`, async ({ request, token }) => {
	const res = await request.patch(`/tenants/${tenant.id}`, {
		headers: { Authorization: `Bearer ${token}` },
		data: {
			organizationId,
			fullName: 'Test Tenant',
		},
	});

	await expect(res).toBeOK();
});

test(`can update single field only`, async ({ request, token }) => {
	const res = await request.patch(`/tenants/${tenant.id}`, {
		headers: { Authorization: `Bearer ${token}` },
		data: {
			organizationId,
			label: 'Test Tenant label',
		},
	});

	await expect(res).toBeOK();
});

test(`returns title field`, async ({ request, token }) => {
	const res = await request.get(`/tenants/${tenant.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	const data = await res.json();
	expect.soft(data).toHaveProperty('fullName');
	expect(data).toHaveProperty('title');
});
