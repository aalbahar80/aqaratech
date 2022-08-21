import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();

	const lease = await parentStuff.api.leases.findOne({ id: params.id });

	const [tenant, unit] = await Promise.all([
		parentStuff.api.tenants.findOne({ id: lease.tenantId }),
		parentStuff.api.units.findOne({ id: lease.unitId }),
	]);

	return { lease, tenant, unit };
};
