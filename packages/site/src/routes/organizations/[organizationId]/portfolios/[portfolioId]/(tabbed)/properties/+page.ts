import type { PageLoad } from './$types';

import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const { portfolioId } = params;

	const properties = await api.portfolios.findProperties({
		id: portfolioId,
		...parseParams(searchParams),
	});

	return { properties };
};
