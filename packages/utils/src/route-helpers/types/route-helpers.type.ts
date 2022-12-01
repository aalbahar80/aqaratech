import type { Entity } from 'src/entity/entity-definition';
import type { PageType } from 'src/route-helpers/enums/page-type.enum';
import type { BaseGetRoute } from 'src/route-helpers/types/base-route.type';
import type {
	GetDashboardRoute,
	GetIdRoute,
} from 'src/route-helpers/types/id-route.type';

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
