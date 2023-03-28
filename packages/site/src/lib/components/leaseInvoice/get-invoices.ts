import type { LoadEvent } from '@sveltejs/kit';

import { createApi } from '$api';

interface GetInvoicesParams {
	fetch?: LoadEvent['fetch'];
	organizationId: string;
}

export const getOrganizationInvoices = async (params: GetInvoicesParams) => {
	const api = createApi(params.fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
	});

	return invoices;
};
