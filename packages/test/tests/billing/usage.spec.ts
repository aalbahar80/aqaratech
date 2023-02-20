/* eslint-disable @typescript-eslint/no-empty-function */
import { expect, type APIRequestContext } from '@playwright/test';
import * as R from 'remeda';
import tier from 'tier';

import { unitFactory } from '@self/seed';
import { tierid } from '@self/utils';

import { prisma } from '../../prisma';
import { resCheck } from '../../utils/res-check';
import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';

test.use({ organizationParams: { isActive: true } });

test.describe('usage', () => {
	test.use({ organizationParams: { isActive: true } });
	test('is reported accurately', async ({ request, org, property }) => {
		const count = 10;
		const toCreate = R.times(count, () =>
			unitFactory.build({
				organizationId: org.organization.id,
				portfolioId: property.portfolioId,
				propertyId: property.id,
			}),
		);

		await prisma.unit.createMany({
			data: toCreate,
		});

		// trigger usage report
		await reportUsage(org.organization.id, request);

		// check that usage is reported correctly
		const usage = await tier.lookupLimit(
			tierid(org.organization.id),
			'feature:unit',
		);

		expect(usage.used).toBe(count);

		// delete units
		await prisma.unit.deleteMany({
			where: { organizationId: org.organization.id },
		});

		// trigger usage report
		await reportUsage(org.organization.id, request);

		// check that usage is reported correctly
		const usage2 = await tier.lookupLimit(
			tierid(org.organization.id),
			'feature:unit',
		);

		expect(usage2.used).toBe(0);
	});

	test.fixme('can view usage + history', async () => {});

	test.fixme('bill matches usage', async () => {});
});

const reportUsage = async (orgId: string, request: APIRequestContext) => {
	const res = await request.post(`${apiURL}/organizations/${orgId}/report`);
	resCheck(res);
};
