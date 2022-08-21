import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const sParams = parseParams(searchParams);

	const parentStuff = await parent();
	const leases = await parentStuff.api.leases.findAll(sParams);

	return { leases };
};
