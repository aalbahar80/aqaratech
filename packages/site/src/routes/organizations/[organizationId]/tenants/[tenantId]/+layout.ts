import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const { tenantId } = params;

	const api = createApi(fetch);

	const tenant = await api.tenants.findOne({ id: tenantId });

	return {
		tenant,
	};
};
