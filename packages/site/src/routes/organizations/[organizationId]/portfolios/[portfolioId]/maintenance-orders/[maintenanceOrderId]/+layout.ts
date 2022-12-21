import { createApi } from '$api';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const maintenanceOrder = await api.maintenanceOrders.findOne({
		id: params.maintenanceOrderId,
	});

	return { maintenanceOrder };
};
