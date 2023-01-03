import type { Entity } from '../../entity/entity-definition';

export type RouteParams = Record<string, string>;

export interface BaseGetRoute {
	entity: Entity;
	params: RouteParams;
}
