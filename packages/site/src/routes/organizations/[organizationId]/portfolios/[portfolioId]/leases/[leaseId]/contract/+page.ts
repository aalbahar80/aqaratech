import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const lease = await api.leases.findOne({ id: params.leaseId });

	const [tenant, unit] = await Promise.all([
		api.tenants.findOne({ id: lease.tenantId }),
		api.units.findOne({ id: lease.unitId }),
	]);

	return { lease, tenant, unit };
};
