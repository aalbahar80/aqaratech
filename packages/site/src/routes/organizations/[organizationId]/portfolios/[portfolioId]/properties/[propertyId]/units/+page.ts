import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const units = await api.properties.findUnits({
		id: params.propertyId,
		...parseParams(searchParams),
	});

	return {
		units,
	};
};
