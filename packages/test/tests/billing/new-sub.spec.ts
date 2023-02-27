import { expect } from '@playwright/test';
import tier from 'tier';

import { tierid } from '@self/utils';

import { test as base } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';
import { plan } from '../api/fixtures/env';

import type { OrganizationCreatedDto } from '../../types/api';

const test = base.extend<{ neworg: OrganizationCreatedDto }>({
	neworg: async ({ request }, use) => {
		const url = `${apiURL}/organizations`;

		const res = await request.post(url, {
			data: { fullName: 'no-stub' },
		});

		const org = (await res.json()) as OrganizationCreatedDto;

		await use(org);
	},
});

test.slow();

test('new org is automatically subscribed', async ({ neworg }) => {
	const phase = await tier.lookupPhase(tierid(neworg.organization.id));

	expect(phase.plans).toHaveLength(1);
	expect(phase.plans).toContainEqual(plan);
});
