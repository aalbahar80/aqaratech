import { dbEntity, Entity, nonDbEntity } from "./entity";

export function isEntity(str: any): str is Entity {
	return dbEntity.includes(str) || nonDbEntity.includes(str);
}
