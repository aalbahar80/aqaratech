import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	// TODO 5 use params.organizationId and params.portfolioId
	const { organizationId, portfolioId } = params;

	const properties = await api.properties.findAll({
		...parseParams(searchParams),
	});

	return { properties };
};
