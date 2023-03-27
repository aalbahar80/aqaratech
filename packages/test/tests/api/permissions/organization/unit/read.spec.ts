import { expect } from '@playwright/test';

import { prisma } from '../../../../../prisma';
import { test } from '../../../api-fixtures';

test.describe('portfolio role can view unit', () => {
	test.use({ userRoleType: 'PORTFOLIO' });

	test('if own unit', async ({ request, lease }) => {
		const res = await request.get(`/units/${lease.unitId}`);
		await expect(res).toBeOK();
	});

	test('not if own unit', async ({ request, org }) => {
		const organizationId = org.organization.id;

		const unit = await prisma.unit.create({
			data: {
				organization: { connect: { id: organizationId } },
				portfolio: {
					create: {
						fullName: 'test',
						organization: { connect: { id: organizationId } },
					},
				},
				property: {
					create: {
						area: 'test',
						organization: { connect: { id: organizationId } },
						portfolio: { create: { fullName: 'test', organizationId } },
					},
				},
				unitNumber: 'test',
			},
		});

		const res = await request.get(`/units/${unit.id}`);

		await expect(res).not.toBeOK();
		expect(res.status()).toBe(404);
	});
});
