import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const parentStuff = await parent();

	const { page, take } = parseParams(searchParams);
	const properties = await parentStuff.api!.properties.findAll({
		page,
		take,
	});

	return { properties };
};
