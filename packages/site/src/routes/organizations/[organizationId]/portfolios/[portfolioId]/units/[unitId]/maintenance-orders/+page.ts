import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const maintenanceOrders = await api.maintenanceOrders.findAll({
		filter: {
			unitId: { equals: params.unitId },
		},
		...parseParams(searchParams),
	});

	return {
		maintenanceOrders,
	};
};
