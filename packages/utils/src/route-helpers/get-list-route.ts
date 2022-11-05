import { entitiesMap } from 'src/entity/entity-map';
import type { GetListRouteInput } from 'src/route-helpers/route-helpers.type';

export const getListRoute = (input: GetListRouteInput, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	return `${base}/${entity}`;
};
