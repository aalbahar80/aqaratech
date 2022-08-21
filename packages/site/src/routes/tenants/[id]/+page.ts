import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);
	const tenantId = params.id;

	const parentStuff = await parent();
	const [tenant, leases, invoices, roles] = await Promise.all([
		parentStuff.api.tenants.findOne({ id: tenantId }),
		parentStuff.api.tenants.findLeases({ id: tenantId }),
		parentStuff.api.tenants.findInvoices({ id: tenantId, ...sParams }),
		parentStuff.api.tenants.findRoles({ id: tenantId }),
	]);

	return { tenant, leases, invoices, roles };
};
