import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const tenant = await api.tenants.findOne({ id: params.tenantId });

	return { tenant };
};
