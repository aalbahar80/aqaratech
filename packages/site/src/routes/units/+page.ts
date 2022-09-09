import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const { page, take } = parseParams(searchParams);

	const parentStuff = await parent();
	const units = await parentStuff.api.units.findAll({ page, take });

	return { units };
};
