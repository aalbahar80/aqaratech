import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const parentStuff = await parent();
	const leaseId = searchParams.get('leaseId');

	if (!leaseId) {
		throw new Error('No leaseId provided');
	}

	const lease = await parentStuff.api.leases.findOne({ id: leaseId });

	const predefined: PredefinedInvoice = {
		leaseId,
		portfolioId: lease.portfolioId,
	};

	return { predefined, lease };
};
