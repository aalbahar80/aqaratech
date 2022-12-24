import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const { portfolioId } = params;

	const api = createApi(fetch);

	const portfolio = await api.portfolios.findOne({ id: portfolioId });

	return {
		portfolio,
	};
};
