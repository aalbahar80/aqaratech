import type { Entity } from '@self/utils';

export enum PageType {
	Id = 'id',
	Edit = 'edit',
	New = 'new',
	List = 'list',
}

// Common

type RouteParams =
	| { organizationId: string; portfolioId: string }
	| Record<string, string>;

interface BaseGetRouteInput {
	entity: Entity;
	params: RouteParams;
}

// Disambiguated

export interface GetListRouteInput extends BaseGetRouteInput {
	pageType: PageType.List;
}

export interface GetIdRouteInput extends BaseGetRouteInput {
	pageType: PageType.Id | PageType.Edit;
	id: string;
}

export interface GetFormRouteInput extends BaseGetRouteInput {
	pageType: PageType.New;
	predefined?: Record<string, string>;
}

export type GetRouteInput =
	| GetIdRouteInput
	| GetFormRouteInput
	| GetListRouteInput;
