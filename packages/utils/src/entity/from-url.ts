import { entitiesMap, UEntityMap, URLName } from './entity-map';

export const fromUrl = (urlName: URLName): UEntityMap => {
	const entity = Object.entries(entitiesMap).find(
		([, value]) => value.urlName === urlName,
	);
	if (entity) {
		return entity[1];
	} else {
		throw new Error(`Could not find entity for urlName: ${urlName}`);
	}
};
