import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const { propertyId } = params;

	const api = createApi(fetch);

	const property = await api.properties.findOne({ id: propertyId });

	return {
		property,
	};
};
