import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const { portfolioId } = params;

	const properties = await api.portfolios.findProperties({
		id: portfolioId,
	});

	return { properties };
};
