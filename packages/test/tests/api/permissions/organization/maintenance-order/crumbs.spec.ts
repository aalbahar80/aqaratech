import { expect } from '@playwright/test';

import { test as base } from '../../../api-fixtures';

import type { MaintenanceOrderDto } from '../../../../../types/api';

const test = base.extend<{ maintenanceOrderDto: MaintenanceOrderDto }>({
	/** Override the default `maintenanceOrders` fixture to get the
	 * maintenanceOrder with breadcrumbs. */
	maintenanceOrderDto: async ({ request, maintenanceOrders }, use) => {
		const res = await request.get(
			`/maintenance-orders/${maintenanceOrders[0].id}`,
			{ failOnStatusCode: true },
		);

		const body = (await res.json()) as MaintenanceOrderDto;

		await use(body);
	},
});

test.use({ maintenanceOrdersParams: [{ unitId: null }] });

test('maintenanceOrder does not include duplicate breadcrumbs', ({
	maintenanceOrderDto: maintenanceOrder,
}) => {
	expect.soft(maintenanceOrder).not.toHaveProperty('portfolio');
	expect.soft(maintenanceOrder).not.toHaveProperty('property');
	expect.soft(maintenanceOrder).not.toHaveProperty('unit');

	expect(maintenanceOrder.breadcrumbs).toHaveProperty('portfolio');
});

test('maintenanceOrder has breadcrumbs - portfolio', ({
	maintenanceOrderDto: maintenanceOrder,
}) => {
	expect(maintenanceOrder.breadcrumbs).toHaveProperty('portfolio');
	expect(maintenanceOrder.breadcrumbs.portfolio).toHaveProperty('id');
	expect(maintenanceOrder.breadcrumbs.portfolio).toHaveProperty('label');
});

test('maintenanceOrder has breadcrumbs - property', ({
	maintenanceOrderDto: maintenanceOrder,
}) => {
	expect(maintenanceOrder.breadcrumbs).toHaveProperty('property');
	expect(maintenanceOrder.breadcrumbs.property).toHaveProperty('id');
	expect(maintenanceOrder.breadcrumbs.property).toHaveProperty('label');
});
