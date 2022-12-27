import { entitiesMap } from 'src/entity/entity-map';

import type { GetListRoute } from 'src/route-helpers/types/route-helpers.type';

export const getListRoute = (input: GetListRoute, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	return `${base}/${entity}`;
};
