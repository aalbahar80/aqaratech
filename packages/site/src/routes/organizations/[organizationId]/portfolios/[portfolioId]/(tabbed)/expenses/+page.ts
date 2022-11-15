import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const expenses = await api.portfolios.findAllExpenses({
		id: params.portfolioId,
		...parseParams(searchParams),
	});

	return { expenses };
};
