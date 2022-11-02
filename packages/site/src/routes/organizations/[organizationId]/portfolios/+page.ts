import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const { page, take } = parseParams(searchParams);
	const portfolios = await api.portfolios.findAll({
		page,
		take,
	});

	return { portfolios };
};
