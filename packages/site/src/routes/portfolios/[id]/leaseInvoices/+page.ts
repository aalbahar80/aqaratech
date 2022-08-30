import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const parentStuff = await parent();

	const { page, take, sortOrder, orderBy } = parseParams(searchParams);
	const invoices = await parentStuff.api.leaseInvoices.findAll({
		page,
		take,
		sortOrder,
		orderBy,
	});

	return { invoices };
};
