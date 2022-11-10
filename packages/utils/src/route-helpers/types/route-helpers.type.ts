import type { Entity } from 'src/entity/entity-definition';
import type { PageType } from 'src/route-helpers/enums/page-type.enum';
import type { GetIdRoute } from 'src/route-helpers/types/id-route.type';

// Common

type RouteParams = Record<string, string>;

export interface BaseGetRoute {
	entity: Entity;
	params: RouteParams;
}

// List Route

export interface GetListRoute extends BaseGetRoute {
	pageType: PageType.List;
}

// Form Route

export interface GetFormRouteBase extends BaseGetRoute {
	entity: Exclude<Entity, 'file' | 'member'>;
	pageType: PageType.New;
	predefined?: Record<string, string>;
}

export interface GetFormRouteWithRelation extends BaseGetRoute {
	entity: Extract<Entity, 'file' | 'member'>;
	pageType: PageType.New;
	predefined: {
		relationKey: Entity;
		relationValue: string;
	};
}

export type GetFormRoute = GetFormRouteBase | GetFormRouteWithRelation;

// Combined

export type GetRoute = GetIdRoute | GetFormRoute | GetListRoute;
