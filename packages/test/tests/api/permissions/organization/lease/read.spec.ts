import { expect } from '@playwright/test';
import * as R from 'remeda';

import { prisma } from '../../../../../prisma';
import { test } from '../../../api-fixtures';

test.describe('portfolio role can view lease', () => {
	test.use({
		userRoleType: 'PORTFOLIO',

		portfoliosParams: R.times(2, () => ({})),
	});

	test('if own lease', async ({ request, lease }) => {
		const res = await request.get(`/leases/${lease.id}`);
		await expect(res).toBeOK();
	});

	test('not if own lease', async ({ request, org }) => {
		const organizationId = org.organization.id;

		// Create a lease in another portfolio (same org)
		const lease = await prisma.lease.create({
			data: {
				monthlyRent: 1,
				start: new Date(),
				end: new Date(),
				organization: { connect: { id: organizationId } },
				tenant: {
					create: {
						fullName: 'test',
						organization: { connect: { id: organizationId } },
					},
				},
				portfolio: {
					create: {
						fullName: 'test',
						organization: { connect: { id: organizationId } },
					},
				},
				unit: {
					create: {
						unitNumber: 'test',
						organization: { connect: { id: organizationId } },
						portfolio: { create: { fullName: 'test', organizationId } },
						property: {
							create: {
								portfolio: {
									create: {
										id: organizationId,
										fullName: 'test',
										organization: { connect: { id: organizationId } },
									},
								},
								organization: { connect: { id: organizationId } },
							},
						},
					},
				},
			},
		});

		const res = await request.get(`/leases/${lease.id}`);

		await expect(res).not.toBeOK();
		// expect(res.status()).toBe(404);
	});
});
