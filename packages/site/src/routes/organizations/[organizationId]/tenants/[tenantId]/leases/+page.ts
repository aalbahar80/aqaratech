import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const leases = await api.tenants.findLeases({
		id: params.tenantId,
		...parseParams(searchParams),
	});

	return { leases };
};
