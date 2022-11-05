import type { Entity } from 'src';
import type {
	InvoicePageTab,
	LeasePageTab,
	PropertyPageTab,
	UnitPageTab,
} from 'src/route-helpers/page-tab.enum';

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

// ID Route - Common

export type GetIdRouteInput =
	| GetIdRouteEntity
	| GetIdRoutePortfolio
	| GetIdRouteProperty
	| GetIdRouteUnit
	| GetIdRouteLease
	| GetIdRouteInvoice;

export interface GetIdRouteEntity extends BaseGetRouteInput {
	pageType: PageType.Id | PageType.Edit;
	id: string;
	// PageTab?: never;
}

// ID Route - Entity

interface GetIdRoutePortfolio extends BaseGetRouteInput {
	entity: Extract<Entity, 'portfolio'>;
	pageType: PageTypePortfolio;
	id: string;
}

interface GetIdRouteProperty extends BaseGetRouteInput {
	id: string;
	entity: Extract<Entity, 'property'>;
	pageType: PropertyPageTab;
}

interface GetIdRouteUnit extends BaseGetRouteInput {
	id: string;
	entity: Extract<Entity, 'unit'>;
	pageType: UnitPageTab;
}

interface GetIdRouteLease extends BaseGetRouteInput {
	id: string;
	entity: Extract<Entity, 'lease'>;
	pageType: LeasePageTab;
}

interface GetIdRouteInvoice extends BaseGetRouteInput {
	id: string;
	entity: Extract<Entity, 'leaseInvoice'>;
	pageType: InvoicePageTab;
}

// Combined

export type GetRouteInput =
	| GetIdRouteInput
	| GetFormRouteInput
	| GetListRouteInput;
