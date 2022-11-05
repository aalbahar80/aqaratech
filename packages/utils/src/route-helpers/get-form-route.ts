import { entitiesMap } from 'src/entity/entity-map';
import type { GetFormRouteInput } from 'src/route-helpers/types/route-helpers.type';

export const getFormRoute = (input: GetFormRouteInput, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	if (input.predefined) {
		const query = new URLSearchParams(input.predefined);

		return `${base}/${entity}/new?${query.toString()}`;
	} else {
		return `${base}/${entity}/new`;
	}
};
