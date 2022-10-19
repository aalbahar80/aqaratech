import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const portfolio = await api.portfolios.findOne({
		id: params.id,
	});

	return { portfolio };
};
