import type { PageLoad } from './$types';

import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const tenants = await api.tenants.findAll({
		...parseParams(searchParams),
	});

	return { tenants };
};
