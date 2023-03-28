import type { PageLoad } from './$types';

import { getOrganizationInvoices } from '$lib/components/leaseInvoice/get-invoices';

export const load: PageLoad = async ({ parent, params, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['getOrganizationInvoices'],
		queryFn: async () =>
			await getOrganizationInvoices({
				fetch,
				organizationId: params.organizationId,
			}),
	});
};
