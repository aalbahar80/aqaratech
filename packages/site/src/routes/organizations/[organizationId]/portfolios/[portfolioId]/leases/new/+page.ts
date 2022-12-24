import * as R from 'remeda';

import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ url, fetch }) => {
	const api = createApi(fetch);

	// Renewal

	const leaseId = url.searchParams.get('leaseId');

	if (leaseId) {
		const lease = await api.leases.findOne({
			id: leaseId,
		});

		// create a new url with the leaseId removed and the unitId added
		const newUrl = new URL(url.pathname, url.origin);

		// remove the leaseId
		newUrl.searchParams.delete('leaseId');

		const predefined = R.pick(lease, [
			'monthlyRent',
			'deposit',
			'notify',
			'canPay',
			'license',
			// We can't pass tenantId field since the combobox label field will be
			// empty when page is loaded.
		]);

		return { predefined };
	} else {
		return;
	}
};
