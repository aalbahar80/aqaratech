import { Entity } from "entity";
import { EntitiesMap, entitiesMap, UEntityMap } from "./entity-map";

export const fromUrl = <T extends EntitiesMap<Entity>["urlName"]>(
	urlName: T
): UEntityMap => {
	const entity = Object.entries(entitiesMap).find(
		([, value]) => value.urlName === urlName
	);
	if (entity) {
		return entity[1];
	} else {
		throw new Error(`Could not find entity for urlName: ${urlName}`);
	}
};
