import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const roles = await api.portfolios.findRoles({
		id: params.portfolioId,
		...parseParams(searchParams),
	});

	return { roles };
};
