import { entitiesMap } from 'src';
import type { GetFormRouteInput } from 'src/route-helpers/route-helpers.type';

export const getFormRoute = (input: GetFormRouteInput, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	if (input.predefined) {
		const query = new URLSearchParams(input.predefined);

		return `${base}/${entity}/new?${query.toString()}`;
	} else {
		return `${base}/${entity}/new`;
	}
};
