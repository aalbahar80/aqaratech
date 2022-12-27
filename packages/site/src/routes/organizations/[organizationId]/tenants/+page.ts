import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const tenants = await api.tenants.findAll({
		...parseParams(searchParams),
	});

	return { tenants };
};
