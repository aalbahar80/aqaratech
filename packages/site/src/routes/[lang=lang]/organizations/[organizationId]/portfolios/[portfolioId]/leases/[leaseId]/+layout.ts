import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const { leaseId } = params;

	const lease = await api.leases.findOne({ id: leaseId });

	return { lease };
};
