import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const tenant = await api.tenants.findOne({ id: params.tenantId });

	return { tenant };
};
