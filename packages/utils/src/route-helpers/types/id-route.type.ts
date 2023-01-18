import type { BaseGetRoute } from './base-route.type';
import type { Entity } from '../../entity/entity-definition';
import type { PageTypePortfolio } from '../enums/page-tab-portfolio.enum';
import type {
	OrganizationPageTab,
	PortfolioPageTab,
	TenantPageTab,
	PropertyPageTab,
	UnitPageTab,
	LeasePageTab,
	InvoicePageTab,
	ExpensePageTab,
} from '../enums/page-tab.enum';
import type { PageType } from '../enums/page-type.enum';

// ID Route - Common

export interface GetIdRouteEntity extends BaseGetRoute {
	id: string;
	pageType: PageType.Id | PageType.Edit;
}

// ID Route - Entity

interface GetIdRouteOrganization extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'organization'>;
	pageType: OrganizationPageTab;
}

export interface GetDashboardRoute extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'portfolio'>;
	pageType: PageTypePortfolio;
	predefined?: {
		propertyId: string;
		unitId?: string;
	};
}

interface GetIdRoutePortfolio extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'portfolio'>;
	pageType: PortfolioPageTab;
}

interface GetIdRouteTenant extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'tenant'>;
	pageType: TenantPageTab;
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

interface GetIdRouteExpense extends BaseGetRoute {
	id: string;
	entity: Extract<Entity, 'expense'>;
	pageType: ExpensePageTab;
}

export type GetIdRoute =
	| GetIdRouteEntity
	| GetIdRouteOrganization
	| GetIdRouteTenant
	| GetIdRoutePortfolio
	| GetIdRouteProperty
	| GetIdRouteUnit
	| GetIdRouteLease
	| GetIdRouteInvoice
	| GetIdRouteExpense;
