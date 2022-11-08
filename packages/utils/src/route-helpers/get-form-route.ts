import type { Entity } from 'src/entity/entity-definition';
import { entitiesMap } from 'src/entity/entity-map';
import type { GetFormRouteInput } from 'src/route-helpers/types/route-helpers.type';

export const getFormRoute = (input: GetFormRouteInput, base: string) => {
	const entity = entitiesMap[input.entity].urlName;

	const predefined = input.predefined ?? getPredefined(input);

	if (predefined) {
		const query = new URLSearchParams(predefined).toString();

		return `${base}/${entity}/new?${query}`;
	} else {
		return `${base}/${entity}/new`;
	}
};

// restrict keys to those that are defined in the entity
type PredefinedMap = {
	[K in Entity]?: string[];
};

const predefinedMap: PredefinedMap = {
	unit: ['propertyId'],
	lease: ['unitId'],
};

const getPredefined = (input: GetFormRouteInput) => {
	const keys = predefinedMap[input.entity];

	return keys?.reduce<Record<string, string>>((acc, key) => {
		const value = input.params[key];

		if (typeof value === 'string') {
			acc[key] = value;
		}

		return acc;
	}, {});
};
