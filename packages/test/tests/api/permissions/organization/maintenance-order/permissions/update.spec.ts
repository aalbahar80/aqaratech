import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { maintenanceOrderFactory, sample } from '@self/seed';

import { test } from '../../../../api-fixtures';

const getUrl = (maintenanceOrderId: string) =>
	`/maintenance-orders/${maintenanceOrderId}`;

const newMaintenanceOrder = R.pick(
	maintenanceOrderFactory.build({
		organizationId: '',
		portfolioId: '',
		propertyId: '',
	}),
	['title', 'description', 'status', 'completedAt'],
);

test('can update maintenanceOrder in own org', async ({
	request,
	maintenanceOrder,
}) => {
	const url = getUrl(maintenanceOrder.id);

	const res = await request.patch(url, {
		data: newMaintenanceOrder,
	});

	expect(res.status()).toBe(200);
});

test('cannot update maintenanceOrder in another org', async ({
	request,
	org: _org,
}) => {
	const url = getUrl(sample.maintenanceOrders[0].id);

	const res = await request.patch(url, { data: newMaintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing maintenanceOrder', async ({ request }) => {
	const url = getUrl(randomUUID());

	const res = await request.patch(url, { data: newMaintenanceOrder });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
