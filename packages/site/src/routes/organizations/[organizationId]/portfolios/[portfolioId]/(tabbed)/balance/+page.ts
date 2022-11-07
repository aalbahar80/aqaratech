import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const balance = await api.portfolios.getBalance({ id: params.portfolioId });

	return { balance };
};
