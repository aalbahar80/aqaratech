import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const payouts = await api.portfolios.findPayouts({
		id: params.portfolioId,
		...parseParams(searchParams),
	});

	return { payouts };
};
