import { createApi } from '$api';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const { tenantId } = params;

	const api = createApi(fetch);

	const tenant = await api.tenants.findOne({ id: tenantId });

	return {
		tenant,
	};
};
