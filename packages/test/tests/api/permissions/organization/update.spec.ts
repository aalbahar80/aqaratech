import { expect } from '@playwright/test';
import * as R from 'remeda';

import { organizationFactory } from '@self/seed';

import { test } from '../../api-fixtures';

test('organization can be updated', async ({ request, org }) => {
	const organization = organizationFactory.build();

	const res = await request.patch(`/organizations/${org.organization.id}`, {
		data: R.pick(organization, ['fullName', 'label']),
	});

	expect(res.status()).toBe(200);

	const data: unknown = await res.json();

	expect(data).toMatchObject({
		label: organization.label,
		fullName: organization.fullName,
		title: organization.label,
	});
});
