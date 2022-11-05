import { createApi } from '$api';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const { leaseId } = params;

	const lease = await api.leases.findOne({ id: leaseId });

	return { lease };
};
