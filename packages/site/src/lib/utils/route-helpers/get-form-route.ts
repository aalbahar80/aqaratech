import type { GetFormRouteInput } from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

export const getFormRoute = (input: GetFormRouteInput, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	if (input.predefined) {
		const query = new URLSearchParams(input.predefined);

		return `${base}/${entity}/new?${query.toString()}`;
	} else {
		return `${base}/${entity}/new`;
	}
};
