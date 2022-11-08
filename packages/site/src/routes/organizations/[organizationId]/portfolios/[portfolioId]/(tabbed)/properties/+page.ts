import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	// TODO 5 use params.organizationId and params.portfolioId
	const { organizationId, portfolioId } = params;

	const properties = await api.portfolios.findProperties({
		id: portfolioId,
	});

	return { properties };
};
