import { dbEntity, Entity, nonDbEntity } from './entity';
import { entitiesMap, URLName } from './entity-map';

export function isEntity(str: string): str is Entity {
	const entities: string[] = [...dbEntity, ...nonDbEntity];
	return entities.includes(str);
}

export function isEntityUrlName(str: string): str is URLName {
	for (const [, value] of Object.entries(entitiesMap)) {
		if (value.urlName === str) {
			return true;
		}
	}
	return false;
}
