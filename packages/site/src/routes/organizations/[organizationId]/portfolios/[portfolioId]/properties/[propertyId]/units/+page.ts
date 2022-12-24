import type { PageLoad } from './$types';

import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const units = await api.portfolios.findUnits({
		id: params.portfolioId,
		filter: {
			propertyId: { equals: params.propertyId },
		},
		...parseParams(searchParams),
	});

	return {
		units,
	};
};
