import type { Entity } from 'src/entity/entity-definition';
import type { PageType } from 'src/route-helpers/enums/page-type.enum';
import type { GetIdRouteInput } from 'src/route-helpers/types/id-route.type';

// Common

type RouteParams = Record<string, string>;

export interface BaseGetRouteInput {
	entity: Entity;
	params: RouteParams;
}

// List Route

export interface GetListRouteInput extends BaseGetRouteInput {
	pageType: PageType.List;
}

// Form Route

export interface GetFormRouteInput extends BaseGetRouteInput {
	pageType: PageType.New;
	predefined?: Record<string, string>;
}

// Combined

export type GetRouteInput =
	| GetIdRouteInput
	| GetFormRouteInput
	| GetListRouteInput;
