import { organizationFactory, testOrgRoleId } from '@self/seed';
import * as R from 'remeda';
import { expect, test } from '../token';
import type { OrganizationCreatedDto } from '../types';

test.use({
	extraHTTPHeaders: {
		'x-role-id': testOrgRoleId,
	},
});

test(`can create organization`, async ({ request, token }) => {
	const org = organizationFactory.build();
	const picked = R.pick(org, ['fullName', 'label']);

	const res = await request.post(`/organizations`, {
		headers: { Authorization: `Bearer ${token}` },
		data: picked,
	});

	expect.soft(res.status()).toBe(201);
});

test(`can get organization`, async ({ request, token }) => {
	// use get request to get the organization
	const org = organizationFactory.build();
	const picked = R.pick(org, ['fullName', 'label']);

	const res = await request.post(`/organizations`, {
		headers: { Authorization: `Bearer ${token}` },
		data: picked,
	});

	expect.soft(res.status()).toBe(201);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const created = (await res.json()) as OrganizationCreatedDto;

	const res2 = await request.get(`/organizations/${created.organization.id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-role-id': created.roleId,
		},
	});

	expect.soft(res2.status()).toBe(200);
	expect.soft(await res2.json()).toMatchObject(picked);
});
