import type { Entity } from '@self/utils';

export enum PageAddress {
	Id = 'id',
	Edit = 'edit',
}

type RouteParams =
	| { organizationId: string; portfolioId: string }
	| { params: Record<string, string> };

interface BaseGetRouteInput {
	entity: Entity;
	params: RouteParams;
}

export interface GetFormRouteInput extends BaseGetRouteInput {
	new: Entity; // ex. lease
	predefined?: Record<string, string>;
}

export interface GetIdRouteInput extends BaseGetRouteInput {
	page: PageAddress;
	id: string;
}

export type GetRouteInput = GetIdRouteInput | GetFormRouteInput;
