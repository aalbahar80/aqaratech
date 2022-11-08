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

/**
 * Predefined form fields for each entity.
 *
 * Note that organizationId and portfolioId are not included here
 * because they are always present in the route.
 */
const predefinedMap: PredefinedMap = {
	// payout: ['portfolioId'],
	// property: ['portfolioId'],
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
