import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const maintenanceOrders = await api.maintenanceOrders.findAll({
		...parseParams(searchParams),
	});

	return { maintenanceOrders };
};
