import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const portfolios = await api.portfolios.findAll({
		...parseParams(searchParams),
	});

	return { portfolios };
};
