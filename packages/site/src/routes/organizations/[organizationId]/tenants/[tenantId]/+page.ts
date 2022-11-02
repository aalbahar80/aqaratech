import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);
	const tenantId = params.id;

	const [tenant, leases, invoices, roles] = await Promise.all([
		api.tenants.findOne({ id: tenantId }),
		api.tenants.findLeases({ id: tenantId }),
		api.tenants.findInvoices({ id: tenantId, ...sParams }),
		api.tenants.findRoles({ id: tenantId }),
	]);

	return { tenant, leases, invoices, roles };
};
