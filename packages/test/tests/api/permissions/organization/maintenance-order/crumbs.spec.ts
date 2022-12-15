import { expect } from '@playwright/test';

import { resCheck } from '../../../../../utils/res-check';
import { test } from '../../../api-fixtures';

import type { MaintenanceOrderDto } from '../../../../../types/api';

test.use({
	maintenanceOrdersParams: [
		{
			unitId: null,
		},
	],

	/**
	 * Override the default `maintenanceOrders` fixture to get the maintenanceOrder with breadcrumbs.
	 */
	maintenanceOrder: async ({ request, maintenanceOrder }, use) => {
		const res = await request.get(`/maintenance-orders/${maintenanceOrder.id}`);
		resCheck(res);

		const body = (await res.json()) as MaintenanceOrderDto;

		await use(body);
	},
});

test('maintenanceOrder does not include duplicate breadcrumbs', ({
	maintenanceOrder,
}) => {
	expect.soft(maintenanceOrder).not.toHaveProperty('portfolio');
	expect.soft(maintenanceOrder).not.toHaveProperty('property');
	expect.soft(maintenanceOrder).not.toHaveProperty('unit');

	expect(maintenanceOrder.breadcrumbs).toHaveProperty('portfolio');
});

test('maintenanceOrder has breadcrumbs - portfolio', ({ maintenanceOrder }) => {
	expect(maintenanceOrder.breadcrumbs).toHaveProperty('portfolio');
	expect(maintenanceOrder.breadcrumbs.portfolio).toHaveProperty('id');
	expect(maintenanceOrder.breadcrumbs.portfolio).toHaveProperty('label');
});

test('maintenanceOrder has breadcrumbs - property', ({ maintenanceOrder }) => {
	expect(maintenanceOrder.breadcrumbs).toHaveProperty('property');
	expect(maintenanceOrder.breadcrumbs.property).toHaveProperty('id');
	expect(maintenanceOrder.breadcrumbs.property).toHaveProperty('label');
});
