import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const sParams = parseParams(searchParams);
	const id = params.id;

	const [portfolio, properties, roles, balance] = await Promise.all([
		api.portfolios.findOne({ id }),
		api.portfolios.findProperties({ id, ...sParams }),
		// TODO handle pagination & default limit
		api.portfolios.findRoles({ id }),
		// TODO handle pagination & default limit
		api.portfolios.getBalance({ id }),
	]);

	return { portfolio, properties, roles, balance };
};
