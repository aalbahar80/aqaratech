import type { LoadEvent } from '@sveltejs/kit';

import { createApi } from '$api';

interface GetPortfoliosParams {
	fetch?: LoadEvent['fetch'];
}

export const getPortfolios = async (params?: GetPortfoliosParams) => {
	const api = createApi(params?.fetch);

	const portfolios = await api.portfolios.findAll();

	return portfolios;
};
