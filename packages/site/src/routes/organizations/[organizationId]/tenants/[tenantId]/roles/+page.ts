import type { PageLoad } from './$types';

import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const roles = await api.tenants.findRoles({
		id: params.tenantId,
		...parseParams(searchParams),
	});

	return { roles };
};
