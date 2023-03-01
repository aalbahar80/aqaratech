import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const leases = await api.tenants.findLeases({
		id: params.id,
		...parseParams(searchParams),
	});

	return {
		leases,
	};
};
