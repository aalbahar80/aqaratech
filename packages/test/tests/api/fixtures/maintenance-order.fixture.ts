import * as R from 'remeda';

import { maintenanceOrderFactory } from '@self/seed';

import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { MaintenanceOrderDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const maintenanceOrderFixtures: AllFixtures = {
	maintenanceOrdersParams: [undefined, { option: true }],

	maintenanceOrders: async (
		{ org, units, request, maintenanceOrdersParams },
		use,
	) => {
		const params = maintenanceOrdersParams ?? [{}];

		// Merge any declared params with the default params

		const maintenanceOrders = R.times(params.length, (n) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const unit = units[n % units.length]!;

			return maintenanceOrderFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				unitId: unit.id,
				...params[n],
			});
		});

		// Insert maintenanceOrders

		const url = `${apiURL}/organizations/${org.organization.id}/maintenance-orders`;

		const created = (await Promise.all(
			maintenanceOrders.map(async (maintenanceOrder) => {
				const picked = R.pick(maintenanceOrder, [
					'portfolioId',
					'propertyId',
					'unitId',
					'tenantId',
					'title',
					'description',
					'status',
					'completedAt',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as MaintenanceOrderDto;
			}),
		)) as [MaintenanceOrderDto, ...MaintenanceOrderDto[]];

		await use(created);
	},

	maintenanceOrder: async ({ maintenanceOrders }, use) => {
		await use(maintenanceOrders[0]);
	},
};
