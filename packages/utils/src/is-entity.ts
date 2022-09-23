import { dbEntity, Entity, nonDbEntity } from './entity';
import { entitiesMap, URLName } from './entity-map';

export function isEntity(str: any): str is Entity {
	return dbEntity.includes(str) || nonDbEntity.includes(str);
}

export function isEntityUrlName(str: any): str is URLName {
	for (const [, value] of Object.entries(entitiesMap)) {
		if (value.urlName === str) {
			return true;
		}
	}
	return false;
}
