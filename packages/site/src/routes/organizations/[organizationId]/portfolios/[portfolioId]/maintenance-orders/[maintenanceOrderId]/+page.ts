import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const maintenanceOrder = await api.maintenanceOrders.findOne({
		id: params.maintenanceOrderId,
	});

	return { maintenanceOrder };
};
