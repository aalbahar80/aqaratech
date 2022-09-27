import { expect } from '@playwright/test';
import { organizationFactory } from '@self/seed';
import * as R from 'remeda';
import type { OrganizationCreatedDto } from '../types/api';
import { test } from './api-config';

test(`can create organization`, async ({ request }) => {
	const org = organizationFactory.build();
	const picked = R.pick(org, ['fullName', 'label']);

	const res = await request.post(`/organizations`, {
		data: picked,
	});

	expect.soft(res.status()).toBe(201);
});

test(`can get organization`, async ({ request }) => {
	// use get request to get the organization
	const org = organizationFactory.build();
	const picked = R.pick(org, ['fullName', 'label']);

	const res = await request.post(`/organizations`, {
		data: picked,
	});

	expect.soft(res.status()).toBe(201);

	const created = (await res.json()) as OrganizationCreatedDto;

	const res2 = await request.get(`/organizations/${created.organization.id}`, {
		headers: {
			'x-role-id': created.roleId,
		},
	});

	expect.soft(res2.status()).toBe(200);
	expect.soft(await res2.json()).toMatchObject(picked);
});
