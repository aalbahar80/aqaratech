import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const leases = await api.tenants.findLeases({ id: params.tenantId });

	return { leases };
};
