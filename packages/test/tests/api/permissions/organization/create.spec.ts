import { expect } from '@playwright/test';

import { organizationFactory } from '@self/seed';

import { test } from '../../api-fixtures';

test('organization can be created', async ({ request }) => {
	const organization = organizationFactory.build();

	const res = await request.post('/organizations', { data: organization });

	expect(res.status()).toBe(201);

	const data: unknown = await res.json();

	expect(data).toHaveProperty(
		'organization',
		expect.objectContaining({
			id: expect.any(String),
			label: organization.label,
			fullName: organization.fullName,
			title: organization.label,
		}),
	);

	expect(data).toHaveProperty('roleId', expect.any(String));
});
