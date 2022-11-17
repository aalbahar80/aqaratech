import { createApi } from '$api';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const api = createApi(fetch);

	// Renewal: Consume the leaseId and replace it with the lease's unitId

	const leaseId = url.searchParams.get('leaseId');

	if (leaseId) {
		const lease = await api.leases.findOne({
			id: leaseId,
		});

		// create a new url with the leaseId removed and the unitId added
		const newUrl = new URL(url.pathname, url.origin);

		// remove the leaseId
		newUrl.searchParams.delete('leaseId');

		// add the unitId
		newUrl.searchParams.set('unitId', lease.unitId);

		// redirect to the new url
		throw redirect(302, newUrl.toString());
	} else {
		return;
	}
};
