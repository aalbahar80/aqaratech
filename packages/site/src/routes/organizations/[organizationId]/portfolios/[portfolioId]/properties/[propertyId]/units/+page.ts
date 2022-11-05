import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const units = await api.properties.findUnits({
		id: params.propertyId,
		take: 100,
	});

	return {
		units,
	};
};
