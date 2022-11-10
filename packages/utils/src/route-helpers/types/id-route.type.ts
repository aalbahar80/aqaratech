import type { Entity } from 'src/entity/entity-definition';
import type { PageTypePortfolio } from 'src/route-helpers/enums/page-tab-portfolio.enum';
import type {
	InvoicePageTab,
	LeasePageTab,
	PortfolioPageTab,
	PropertyPageTab,
	UnitPageTab,
} from 'src/route-helpers/enums/page-tab.enum';
import type { PageType } from 'src/route-helpers/enums/page-type.enum';
import type { BaseGetRoute } from 'src/route-helpers/types/route-helpers.type';

// ID Route - Common

export interface GetIdRouteEntity extends BaseGetRoute {
	id: string;
	pageType: PageType.Id | PageType.Edit;
}

// ID Route - Entity

interface GetIdRoutePortfolio extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'portfolio'>;
	pageType: PageTypePortfolio | PortfolioPageTab;
}

interface GetIdRouteProperty extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'property'>;
	pageType: PropertyPageTab;
}

interface GetIdRouteUnit extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'unit'>;
	pageType: UnitPageTab;
}

interface GetIdRouteLease extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'lease'>;
	pageType: LeasePageTab;
}

interface GetIdRouteInvoice extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'leaseInvoice'>;
	pageType: InvoicePageTab;
}

export type GetIdRoute =
	| GetIdRouteEntity
	| GetIdRoutePortfolio
	| GetIdRouteProperty
	| GetIdRouteUnit
	| GetIdRouteLease
	| GetIdRouteInvoice;
