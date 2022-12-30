import type { Entity } from '../../entity/entity-definition';
import type { PageType } from '../enums/page-type.enum';
import type { BaseGetRoute } from './base-route.type';
import type { GetIdRoute, GetDashboardRoute } from './id-route.type';

// List Route

export interface GetListRoute extends BaseGetRoute {
	pageType: PageType.List;
}

// Form Route

export interface GetFormRouteBase extends BaseGetRoute {
	pageType: PageType.New;
	predefined?: Record<string, string>;
}

export interface GetFormRouteWithRelation extends GetFormRouteBase {
	entity: Extract<Entity, 'file' | 'role'>;
	predefined: {
		relationKey: Entity;
		relationValue: string;
	};
}

export type GetFormRoute = GetFormRouteBase | GetFormRouteWithRelation;

// Combined

export type GetRoute =
	| GetIdRoute
	| GetDashboardRoute
	| GetFormRoute
	| GetListRoute;
