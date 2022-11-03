import type { Entity } from '@self/utils';

export enum PageType {
	Id = 'id',
	Edit = 'edit',
	New = 'new',
}

type RouteParams =
	| { organizationId: string; portfolioId: string }
	| { params: Record<string, string> };

interface BaseGetRouteInput {
	entity: Entity;
	params: RouteParams;
}

export interface GetFormRouteInput extends BaseGetRouteInput {
	predefined?: Record<string, string>;
}

export interface GetIdRouteInput extends BaseGetRouteInput {
	page: PageType;
	id: string;
}

export type GetRouteInput = GetIdRouteInput | GetFormRouteInput;
