import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const leases = await api.units.findLeases({ id: params.unitId, take: 100 });

	return {
		leases,
	};
};
