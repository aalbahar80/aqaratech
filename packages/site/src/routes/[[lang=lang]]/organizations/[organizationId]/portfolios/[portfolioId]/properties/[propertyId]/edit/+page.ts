import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const property = await api.properties.findOne({ id: params.propertyId });

	return { property };
};
