import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

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
