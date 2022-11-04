import type { Entity } from '@self/utils';

export enum PageType {
	Id = 'id',
	Edit = 'edit',
	New = 'new',
	List = 'list',
}

export enum PageTypePortfolio {
	Summary = 'summary',
	Income = 'income',
	Expenses = 'expenses',
	Payouts = 'payouts',
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

// List Route

export interface GetListRouteInput extends BaseGetRouteInput {
	pageType: PageType.List;
}

// Form Route

export interface GetFormRouteInput extends BaseGetRouteInput {
	pageType: PageType.New;
	predefined?: Record<string, string>;
}

// ID Route

export type GetIdRouteInput = GetIdRouteEntity | GetIdRoutePortfolio;

export interface GetIdRouteEntity extends BaseGetRouteInput {
	pageType: PageType.Id | PageType.Edit;
	id: string;
}

export interface GetIdRoutePortfolio extends BaseGetRouteInput {
	entity: Extract<Entity, 'portfolio'>;
	pageType: PageTypePortfolio;
	id: string;
}

// Combined

export type GetRouteInput =
	| GetIdRouteInput
	| GetFormRouteInput
	| GetListRouteInput;
