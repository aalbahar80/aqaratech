import type { Entity } from '../../entity/entity-definition';

type RouteParams = Record<string, string>;

export interface BaseGetRoute {
	entity: Entity;
	params: RouteParams;
}
