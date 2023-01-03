import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const balance = await api.portfolios.getBalance({ id: params.portfolioId });

	return { balance };
};
