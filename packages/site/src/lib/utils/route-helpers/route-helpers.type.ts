import type { Entity } from '@self/utils';

export enum PageType {
	Id = 'id',
	Edit = 'edit',
	New = 'new',
	List = 'list',
}

type RouteParams =
	| { organizationId: string; portfolioId: string }
	| Record<string, string>;

interface BaseGetRouteInput {
	entity: Entity;
	params: RouteParams;
}

export interface GetFormRouteInput extends BaseGetRouteInput {
	pageType: PageType.New;
	predefined?: Record<string, string>;
}

export interface GetIdRouteInput extends BaseGetRouteInput {
	pageType: PageType.Id | PageType.Edit;
	id: string;
}

export interface GetListRouteInput extends BaseGetRouteInput {
	pageType: PageType.List;
}

export type GetRouteInput =
	| GetIdRouteInput
	| GetFormRouteInput
	| GetListRouteInput;
