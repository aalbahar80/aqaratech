import type { GetListRouteInput } from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

export const getListRoute = (input: GetListRouteInput, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	return `${base}/${entity}`;
};
