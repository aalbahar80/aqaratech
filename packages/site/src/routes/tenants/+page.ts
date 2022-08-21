import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const { page, take, q } = parseParams(searchParams);

	const parentStuff = await parent();
	const tenants = await parentStuff.api.tenants.findAll({
		page,
		take,
		q,
	});

	return { tenants };
};
