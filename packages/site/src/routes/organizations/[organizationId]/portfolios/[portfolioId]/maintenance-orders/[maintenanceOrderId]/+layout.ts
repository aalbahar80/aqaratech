import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const maintenanceOrder = await api.maintenanceOrders.findOne({
		id: params.maintenanceOrderId,
	});

	return { maintenanceOrder };
};
